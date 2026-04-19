/**
 * Freya Agent — Claude-powered AI analyst with PKSF-specific tools.
 * Implements a full agentic tool-use loop: Claude decides which tools to call,
 * we execute them against Supabase + in-memory data, and return the final response.
 */

import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "./supabase";
import type { FreyaResponse } from "./types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Tool Definitions ────────────────────────────────────────

const FREYA_TOOLS: Anthropic.Tool[] = [
  {
    name: "search_knowledge_base",
    description:
      "Search the PKSF knowledge base for relevant information. Use this for questions about PKSF programs, policies, history, MD profile, governance, project details, partner organization profiles, or any conceptual question. Returns the most relevant document chunks.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "The search query — use natural language keywords related to the topic",
        },
        category: {
          type: "string",
          enum: ["overview", "program", "po", "project", "financial", "risk", "governance", "md_profile", "all"],
          description: "Filter by category, or 'all' to search across everything",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default 3, max 6)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_portfolio_kpis",
    description:
      "Get real-time PKSF portfolio KPI data: total disbursement, recovery rate, active PO count, membership, outstanding portfolio, program breakdown. Use for portfolio overview or summary questions.",
    input_schema: {
      type: "object" as const,
      properties: {
        include_program_breakdown: {
          type: "boolean",
          description: "Whether to include program-by-program portfolio breakdown",
        },
      },
    },
  },
  {
    name: "get_po_performance",
    description:
      "Get Partner Organization performance data: recovery rates, PAR30, compliance scores, member counts, outstanding amounts, trends, alerts. Can filter by PO name or tier.",
    input_schema: {
      type: "object" as const,
      properties: {
        po_name: {
          type: "string",
          description: "Optional: filter to a specific PO name (partial match, e.g. 'JCF', 'BRAC', 'ASA')",
        },
        tier_filter: {
          type: "string",
          enum: ["A", "B", "C", "D", "all"],
          description: "Filter by tier (default: all)",
        },
        high_risk_only: {
          type: "boolean",
          description: "If true, return only POs with alerts or critical issues",
        },
      },
    },
  },
  {
    name: "get_project_status",
    description:
      "Get development project health data: burn rates, status (on-track/at-risk/closing), funder, due dates, critical alerts. Covers RAISE, SMART, RMTP, REOPA, PROSPER, PACE-B, KATALYST, JEEON.",
    input_schema: {
      type: "object" as const,
      properties: {
        project_name: {
          type: "string",
          description: "Optional: specific project name filter (e.g. 'RAISE', 'SMART', 'RMTP')",
        },
        at_risk_only: {
          type: "boolean",
          description: "If true, return only at-risk or critical projects",
        },
      },
    },
  },
  {
    name: "get_flood_risk_data",
    description:
      "Get current river monitoring data and flood risk assessment for Sylhet Division. Returns water levels, danger/warning thresholds, status, and PKSF borrower impact estimates.",
    input_schema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_ces_bank_utilization",
    description:
      "Get CES (Commercial Enterprise Sector) bank utilization data: allocated vs utilized amounts, utilization percentages, alerts for banks nearing ceiling or underperforming.",
    input_schema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_psychometric_profiles",
    description:
      "Get PO psychometric / institutional health profiles: 5-dimensional scores (Financial Health, Governance Quality, Operational Resilience, Social Impact, Adaptive Capacity), overall scores, risk flags.",
    input_schema: {
      type: "object" as const,
      properties: {
        po_id: {
          type: "string",
          description: "Optional: specific PO id (e.g. 'jcf', 'brac', 'asa', 'tmss')",
        },
      },
    },
  },
];

// ── Tool Execution ──────────────────────────────────────────

async function executeTool(
  name: string,
  input: Record<string, unknown>
): Promise<string> {
  switch (name) {
    case "search_knowledge_base":
      return await searchKnowledgeBase(
        input.query as string,
        (input.category as string) || "all",
        (input.limit as number) || 3
      );

    case "get_portfolio_kpis":
      return JSON.stringify(getPortfolioKPIs(input.include_program_breakdown as boolean));

    case "get_po_performance":
      return JSON.stringify(
        getPOPerformance(
          input.po_name as string | undefined,
          input.tier_filter as string | undefined,
          input.high_risk_only as boolean | undefined
        )
      );

    case "get_project_status":
      return JSON.stringify(
        getProjectStatus(
          input.project_name as string | undefined,
          input.at_risk_only as boolean | undefined
        )
      );

    case "get_flood_risk_data":
      return JSON.stringify(getFloodRiskData());

    case "get_ces_bank_utilization":
      return JSON.stringify(getCESBankUtilization());

    case "get_psychometric_profiles":
      return JSON.stringify(getPsychometricProfiles(input.po_id as string | undefined));

    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

// ── Knowledge Base Search (Supabase FTS) ───────────────────

async function searchKnowledgeBase(
  query: string,
  category: string,
  limit: number
): Promise<string> {
  try {
    let qb = supabaseAdmin
      .from("kb_documents")
      .select("title, category, content, metadata")
      .textSearch("fts", query.split(" ").join(" & "), { type: "plain" })
      .limit(Math.min(limit, 6));

    if (category !== "all") {
      qb = qb.eq("category", category);
    }

    const { data, error } = await qb;

    if (error) throw error;

    if (!data || data.length === 0) {
      // Fallback: partial match on title/content
      const { data: fallback } = await supabaseAdmin
        .from("kb_documents")
        .select("title, category, content, metadata")
        .ilike("content", `%${query.split(" ")[0]}%`)
        .limit(3);

      if (fallback && fallback.length > 0) {
        return JSON.stringify(
          fallback.map((d) => ({
            title: d.title,
            category: d.category,
            content: d.content.substring(0, 1200),
          }))
        );
      }

      return JSON.stringify({ message: "No documents found for this query." });
    }

    return JSON.stringify(
      data.map((d) => ({
        title: d.title,
        category: d.category,
        content: d.content.substring(0, 1500),
      }))
    );
  } catch (err) {
    console.error("KB search error:", err);
    return JSON.stringify({ error: "Knowledge base search failed", detail: String(err) });
  }
}

// ── Data Tool Functions ─────────────────────────────────────

function getPortfolioKPIs(includePrograms = true) {
  const base = {
    as_of: "June 2025",
    total_disbursement_fy2024_25: { value: "BDT 93.58 Billion", change: "+23.89% YoY" },
    recovery_rate: "99.21%",
    active_partner_organizations: 278,
    total_members: "20.7 Million",
    women_members_pct: "93.67%",
    active_borrowers: "15.8 Million",
    portfolio_outstanding: "BDT 858.29 Billion",
    par30_system_wide: "0.94%",
    write_off_rate: "0.08%",
    available_liquidity_q1_fy26: "BDT 780 Crore",
    target_disbursement_fy2025_26: "BDT 110 Billion",
  };
  if (includePrograms) {
    return {
      ...base,
      program_breakdown: [
        { name: "Agrosor (Agriculture)", share: "48.49%", avg_loan: "BDT 65,000", rate: "24% declining" },
        { name: "Jagoron (Livelihood)", share: "32.14%", avg_loan: "BDT 45,000" },
        { name: "Sufolon (Afforestation)", share: "6.09%" },
        { name: "Buniad (Ultra-Poor)", share: "0.99%", note: "Asset transfer + credit bundle" },
        { name: "Other / CES / ENRICH", share: "12.29%" },
      ],
    };
  }
  return base;
}

function getPOPerformance(
  poName?: string,
  tierFilter?: string,
  highRiskOnly?: boolean
) {
  const ALL_POs = [
    {
      id: "jcf",
      name: "Jagorani Chakra Foundation (JCF)",
      tier: "C",
      grade: "D",
      recovery_rate: 96.8,
      par30: 4.2,
      compliance: 58,
      members: 420000,
      outstanding_bdt_b: 8.4,
      trend: "down",
      status: "PROBATIONARY",
      alert: "CRITICAL: Misappropriation BDT 42L (Jessore), MIS manipulation, 4 audit findings. Disbursements suspended.",
    },
    {
      id: "brac",
      name: "BRAC",
      tier: "A",
      grade: "A",
      recovery_rate: 99.8,
      par30: 0.2,
      compliance: 95,
      members: 3200000,
      outstanding_bdt_b: 48.2,
      trend: "stable",
      status: "STABLE",
      alert: null,
    },
    {
      id: "asa",
      name: "ASA",
      tier: "A",
      grade: "A",
      recovery_rate: 99.7,
      par30: 0.3,
      compliance: 93,
      members: 2800000,
      outstanding_bdt_b: 42.1,
      trend: "stable",
      status: "STABLE",
      alert: null,
    },
    {
      id: "tmss",
      name: "TMSS (Thengamara Mohila Sabuj Sangha)",
      tier: "A",
      grade: "B+",
      recovery_rate: 99.5,
      par30: 0.5,
      compliance: 91,
      members: 890000,
      outstanding_bdt_b: 15.6,
      trend: "up",
      status: "STABLE",
      alert: null,
    },
    {
      id: "esdo",
      name: "ESDO (Eco-Social Development Organization)",
      tier: "B",
      grade: "C",
      recovery_rate: 98.9,
      par30: 1.1,
      compliance: 78,
      members: 560000,
      outstanding_bdt_b: 9.8,
      trend: "down",
      status: "WATCH",
      alert: "PAR rising — Barind drought impact. Restructuring request for 2,340 borrowers pending.",
    },
    {
      id: "padakhep",
      name: "Padakhep Manabik Unnayan Kendra",
      tier: "B",
      grade: "C",
      recovery_rate: 98.2,
      par30: 1.8,
      compliance: 72,
      members: 320000,
      outstanding_bdt_b: 6.2,
      trend: "stable",
      status: "WATCH",
      alert: "High staff turnover (28%) impacting Mymensingh/Netrokona collection.",
    },
    {
      id: "shakti",
      name: "Shakti Foundation for Disadvantaged Women",
      tier: "A",
      grade: "B+",
      recovery_rate: 99.3,
      par30: 0.7,
      compliance: 88,
      members: 680000,
      outstanding_bdt_b: 11.4,
      trend: "stable",
      status: "STABLE",
      alert: null,
    },
    {
      id: "buro",
      name: "BURO Bangladesh",
      tier: "B",
      grade: "C+",
      recovery_rate: 98.7,
      par30: 1.3,
      compliance: 80,
      members: 445000,
      outstanding_bdt_b: 7.8,
      trend: "stable",
      status: "WATCH",
      alert: "Enhanced monitoring since Feb 2025 — compliance improving.",
    },
  ];

  let result = [...ALL_POs];

  if (poName) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(poName.toLowerCase()) ||
      p.id.toLowerCase().includes(poName.toLowerCase())
    );
  }
  if (tierFilter && tierFilter !== "all") {
    result = result.filter((p) => p.tier === tierFilter);
  }
  if (highRiskOnly) {
    result = result.filter((p) => p.alert !== null);
  }

  return { as_of: "June 2025", total_pos_system: 278, data: result };
}

function getProjectStatus(projectName?: string, atRiskOnly?: boolean) {
  const PROJECTS = [
    {
      name: "RAISE",
      funder: "World Bank IDA",
      amount_usd_m: 530,
      burn_rate_pct: 82,
      status: "ON TRACK",
      alert: "CRITICAL: IFR due in 18 days (1 Aug 2025). USD 45M disbursement contingent on approval. Needs MD sign-off.",
    },
    {
      name: "SMART",
      funder: "ADB",
      amount_usd_m: 100,
      burn_rate_pct: 41,
      status: "AT RISK",
      alert: "Significantly underspent. ADB country mission Q3 2025. Risk of USD 35M cancellation if no recovery by Dec 2025.",
    },
    {
      name: "RMTP",
      funder: "IFAD",
      amount_usd_m: 80,
      burn_rate_pct: 94,
      status: "CLOSING",
      alert: "Final accounts due Sept 2025. IFAD interested in RMTP-2 follow-on.",
    },
    {
      name: "REOPA",
      funder: "EU/DFID",
      amount_usd_m: 45,
      burn_rate_pct: 67,
      status: "ON TRACK",
      alert: null,
    },
    {
      name: "PROSPER",
      funder: "USAID",
      amount_usd_m: 35,
      burn_rate_pct: 55,
      status: "ON TRACK",
      alert: "Quarterly USAID review due 30 July.",
    },
    {
      name: "PACE-B",
      funder: "SwissContact",
      amount_usd_m: 22,
      burn_rate_pct: 78,
      status: "ON TRACK",
      alert: null,
    },
    {
      name: "KATALYST III",
      funder: "SDC",
      amount_usd_m: 18,
      burn_rate_pct: 89,
      status: "AT RISK",
      alert: "SDC audit flagged disbursement quality — documentation gaps.",
    },
    {
      name: "JEEON",
      funder: "FCDO",
      amount_usd_m: 15,
      burn_rate_pct: 45,
      status: "ON TRACK",
      alert: null,
    },
  ];

  let result = [...PROJECTS];
  if (projectName) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(projectName.toLowerCase())
    );
  }
  if (atRiskOnly) {
    result = result.filter((p) => p.status === "AT RISK" || p.status === "CLOSING");
  }
  return { as_of: "June 2025", data: result };
}

function getFloodRiskData() {
  return {
    as_of: "24 July 2025",
    division: "Sylhet",
    alert_level: "CRITICAL",
    river_stations: [
      {
        river: "Surma",
        location: "Sylhet Sadar",
        current_level_m: 10.82,
        warning_level_m: 9.50,
        danger_level_m: 10.50,
        status: "ABOVE DANGER",
      },
      {
        river: "Kushiyara",
        location: "Sherpur, Moulvibazar",
        current_level_m: 9.14,
        warning_level_m: 8.20,
        danger_level_m: 9.00,
        status: "ABOVE DANGER",
      },
      {
        river: "Old Surma",
        location: "Sunamganj",
        current_level_m: 7.80,
        warning_level_m: 7.20,
        danger_level_m: 8.50,
        status: "AT WARNING",
      },
      {
        river: "Manu",
        location: "Moulvibazar",
        current_level_m: 8.30,
        warning_level_m: 7.80,
        danger_level_m: 9.00,
        status: "APPROACHING WARNING",
      },
    ],
    pksf_impact: {
      affected_borrowers_estimated: 340,
      portfolio_at_risk_bdt_crore: { low: 28, high: 42 },
      pos_affected: [
        { po: "TMSS", borrowers: 120 },
        { po: "JCF", borrowers: 89 },
        { po: "ESDO", borrowers: 67 },
        { po: "Padakhep", borrowers: 44 },
        { po: "ASA", borrowers: 20 },
      ],
      response: {
        moratorium_days: 90,
        relief_fund_bdt_crore: 5,
        insurance_covered_borrowers: 28,
        verification_deadline: "28 July 2025",
      },
    },
  };
}

function getCESBankUtilization() {
  return {
    as_of: "June 2025",
    total_portfolio_bdt_crore: 1000,
    banks: [
      {
        name: "NCC Bank",
        allocated_crore: 200,
        utilized_crore: 160,
        utilization_pct: 80,
        status: "NEAR CEILING",
        note: "Expansion request of BDT 50 Crore submitted",
      },
      {
        name: "Sonali Bank",
        allocated_crore: 250,
        utilized_crore: 175,
        utilization_pct: 70,
        status: "ADEQUATE",
      },
      {
        name: "Agrani Bank",
        allocated_crore: 200,
        utilized_crore: 130,
        utilization_pct: 65,
        status: "MODERATE",
      },
      {
        name: "Janata Bank",
        allocated_crore: 200,
        utilized_crore: 110,
        utilization_pct: 55,
        status: "UNDERUTILIZED",
        note: "Delayed fund release due to bank liquidity issue",
      },
      {
        name: "BASIC Bank",
        allocated_crore: 150,
        utilized_crore: 72,
        utilization_pct: 48,
        status: "UNDERUTILIZED",
        note: "BASIC Bank's own NPL at 42% — credit committee reviewing further exposure",
      },
    ],
  };
}

function getPsychometricProfiles(poId?: string) {
  const PROFILES = [
    {
      id: "jcf",
      name: "Jagorani Chakra Foundation",
      overall_score: 48,
      tier: "C",
      risk_flag: "HIGH RISK",
      dimensions: [
        { name: "Financial Health", score: 8, max: 20 },
        { name: "Governance Quality", score: 9, max: 20 },
        { name: "Operational Resilience", score: 11, max: 20 },
        { name: "Social Impact", score: 12, max: 20 },
        { name: "Adaptive Capacity", score: 8, max: 20 },
      ],
      recommendation: "Immediate intervention required. Probationary status justified. Financial health critically low due to PAR30 at 4.2% and confirmed misappropriation. Governance failure at branch level. PKSF should deploy resident advisor and consider partial portfolio transfer to stable POs in the region.",
    },
    {
      id: "brac",
      name: "BRAC",
      overall_score: 92,
      tier: "A",
      risk_flag: "STABLE",
      dimensions: [
        { name: "Financial Health", score: 20, max: 20 },
        { name: "Governance Quality", score: 18, max: 20 },
        { name: "Operational Resilience", score: 20, max: 20 },
        { name: "Social Impact", score: 17, max: 20 },
        { name: "Adaptive Capacity", score: 17, max: 20 },
      ],
      recommendation: "Flagship partner — prioritize for expanded RAISE credit lines. Leverage BRAC's digital infrastructure for DFS pilot expansion. Consider BRAC as anchor for RMTP-2 design.",
    },
    {
      id: "asa",
      name: "ASA",
      overall_score: 88,
      tier: "A",
      risk_flag: "STABLE",
      dimensions: [
        { name: "Financial Health", score: 19, max: 20 },
        { name: "Governance Quality", score: 18, max: 20 },
        { name: "Operational Resilience", score: 18, max: 20 },
        { name: "Social Impact", score: 16, max: 20 },
        { name: "Adaptive Capacity", score: 17, max: 20 },
      ],
      recommendation: "Strong partner. ASA's standardized branch model is ideal for geographic expansion. Social impact score slightly lower — integrate more women empowerment programming. DFS adoption already strong.",
    },
    {
      id: "tmss",
      name: "TMSS",
      overall_score: 78,
      tier: "A",
      risk_flag: "WATCH",
      dimensions: [
        { name: "Financial Health", score: 17, max: 20 },
        { name: "Governance Quality", score: 15, max: 20 },
        { name: "Operational Resilience", score: 15, max: 20 },
        { name: "Social Impact", score: 18, max: 20 },
        { name: "Adaptive Capacity", score: 13, max: 20 },
      ],
      recommendation: "Good performer with highest social impact score. Governance and adaptive capacity have room to grow. Support TMSS with board training and digital transition support. Sylhet flood may temporarily stress TMSS numbers — monitor closely in Q2.",
    },
  ];

  if (poId) {
    const found = PROFILES.find((p) => p.id === poId.toLowerCase());
    return found ? [found] : [];
  }
  return PROFILES;
}

// ── System Prompt ────────────────────────────────────────────
// (Imported from system-prompt.ts, extended with tool guidance)

import { getSystemPrompt } from "./system-prompt";

// ── Panel Generator (Step 2) ─────────────────────────────────
/**
 * Given the user's query, Claude's conversational answer, and any tool
 * data collected, generate structured HTML output panels via a second
 * focused Claude call.  This separation keeps the main agentic loop
 * simple (just prose) and lets Claude focus exclusively on HTML formatting.
 */
export async function generatePanels(
  userQuery: string,
  answer: string,
  toolData: string,
): Promise<Array<{ type: string; label: string; title: string; content: string }>> {

  const PANEL_SYSTEM = `You are a structured document generator for the Freya PKSF financial intelligence dashboard.

Output ONLY a valid JSON array — no markdown fences, no explanation, no text before or after.

FORMAT:
[
  {
    "type": "brief",
    "label": "Brief",
    "title": "JCF Partner Organization — Recovery Crisis",
    "content": "## Executive Summary\\n\\nJCF is currently on **PROBATIONARY** status...\\n\\n### Key Metrics\\n\\n| Metric | Value |\\n|--------|-------|\\n| Recovery Rate | 96.8% |\\n| PAR30 | 4.2% |"
  }
]

The "title" field must be SHORT and SPECIFIC — e.g. "JCF Recovery Crisis", "RAISE Burn Rate Alert", "Sylhet Flood Q3". Never use generic titles like "Portfolio Overview".

The "content" field must be well-structured **Markdown** using:
- ## for section headings, ### for sub-headings
- **bold** for key terms and values
- Markdown tables for data: | Col | Col |\\n|-----|-----|\\n| val | val |
- Bullet lists with - for findings, actions, items
- > blockquote for critical alerts or warnings
- Numbered lists 1. 2. 3. for ordered steps

Panel types:
  brief          → "Brief"          executive KPI summary with metrics table
  discrepancies  → "Discrepancies"  audit findings, problems, anomalies as a list
  recommendations→ "Actions"        numbered action steps to resolve findings
  risk_analysis  → "Risk Analysis"  risk assessment with severity ratings
  po_analysis    → "PO Analysis"    partner org deep-dive with table of metrics
  project_status → "Project Status" project health with burn rates and deadlines
  flood_impact   → "Flood Impact"   disaster risk table and response actions
  data_needed    → "Data Needed"    list of missing data required for analysis

Rules:
- Use real numbers and facts from the analysis — never invent data
- Keep content dense and professional — suitable for a Word document
- Each panel content should be 150-400 words, well structured`;

  const q = userQuery.toLowerCase();
  const wantsDiscrepancies = q.includes("discrepanc") || q.includes("audit") || q.includes("risk") || q.includes("problem") || q.includes("issue") || q.includes("finding");
  const wantsRecommendations = q.includes("recommend") || q.includes("solution") || q.includes("action") || q.includes("what should") || q.includes("discrepanc") || q.includes("audit");
  const wantsRisk = q.includes("risk") && !wantsDiscrepancies;
  const wantsPO = q.includes("po ") || q.includes("partner org") || q.includes("jcf") || q.includes("brac") || q.includes("asa");
  const wantsProject = q.includes("project") || q.includes("raise") || q.includes("smart") || q.includes("rmtp");

  const panelList = [
    "brief (executive summary with key metrics)",
    wantsDiscrepancies && "discrepancies (problems, audit findings, anomalies)",
    wantsRecommendations && "recommendations (action steps to resolve findings)",
    wantsRisk && "risk_analysis (risk assessment)",
    wantsPO && "po_analysis (partner org details)",
    wantsProject && "project_status (project health)",
  ].filter(Boolean).join(", ");

  const userPrompt = `User query: "${userQuery}"

Freya's analysis:
${answer.substring(0, 3000)}

${toolData ? `Data:\n${toolData.substring(0, 2000)}` : ""}

Generate these panels: ${panelList}

Rules:
- Output ONLY the JSON array, nothing else
- Use SINGLE QUOTES in all HTML attributes
- "title" must be specific to this query (e.g. "JCF Recovery Crisis", "RAISE Burn Rate Alert") — never generic like "Portfolio Overview"
- Use real numbers and facts from the analysis above — never invent data`;

  try {
    const resp = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: PANEL_SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    });

    const raw = resp.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "";
    console.log("[Freya panels] raw length:", raw.length, "prefix:", raw.substring(0, 150));

    // Strategy 1: Parse as JSON array (primary)
    try {
      // Strip code fences if present, then extract the JSON array
      const stripped = raw
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```\s*$/i, "")
        .trim();
      const jsonStr = stripped.startsWith("[")
        ? stripped
        : (stripped.match(/\[[\s\S]*\]/)?.[0] ?? "");
      if (jsonStr) {
        const parsed = JSON.parse(jsonStr) as Array<{ type: string; label: string; title: string; content: string }>;
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter(p => p.type && p.content);
          if (valid.length > 0) {
            console.log(`[Freya panels] JSON: ${valid.length} panels`);
            return valid;
          }
        }
      }
    } catch (jsonErr) {
      console.log("[Freya panels] JSON parse failed:", (jsonErr as Error).message);
    }

    // Strategy 2: Delimiter format fallback <<PANEL...>>...<<END_PANEL>>
    const delimPanels: Array<{ type: string; label: string; title: string; content: string }> = [];
    const pat = /<<PANEL([\s\S]*?)>>([\s\S]*?)<<END_PANEL>>/gi;
    let m: RegExpExecArray | null;
    while ((m = pat.exec(raw)) !== null) {
      const attrs = m[1];
      const content = m[2].trim();
      const type  = (attrs.match(/type=["']([^"']+)["']/i)  || [])[1] ?? "summary";
      const label = (attrs.match(/label=["']([^"']+)["']/i) || [])[1] ?? "Output";
      const title = (attrs.match(/title=["']([^"']+)["']/i) || [])[1] ?? "Analysis";
      if (content) delimPanels.push({ type, label, title, content });
    }
    if (delimPanels.length > 0) {
      console.log(`[Freya panels] delimiter fallback: ${delimPanels.length} panels`);
      return delimPanels;
    }

    console.log("[Freya panels] no panels parsed. Raw snippet:", raw.substring(0, 400));
    return [];
  } catch (err) {
    console.error("[Freya panels] generation failed:", err);
    return [];
  }
}

// ── Agentic Loop ────────────────────────────────────────────

export interface AgentMessage {
  role: "user" | "assistant";
  content: string;
}

export interface FileAttachment {
  name: string;
  mediaType: string;
  base64: string;
}

type ClaudeContent =
  | Anthropic.TextBlockParam
  | Anthropic.ImageBlockParam
  | Anthropic.ToolUseBlockParam
  | Anthropic.ToolResultBlockParam
  // Claude supports PDFs natively as document blocks
  | { type: "document"; source: { type: "base64"; media_type: "application/pdf"; data: string } };

type ClaudeMessage = {
  role: "user" | "assistant";
  content: string | ClaudeContent[];
};

export async function runFreyaAgent(
  conversationHistory: AgentMessage[],
  attachments?: FileAttachment[],  // images + PDFs
  fileNames?: string[],            // non-encodable files (xlsx, docx, etc.)
  personaId?: string               // persona id to use for system prompt
): Promise<FreyaResponse> {
  // Build message list for the API
  const messages: ClaudeMessage[] = conversationHistory.slice(0, -1).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  // Handle last user message with possible attachments
  const lastMsg = conversationHistory[conversationHistory.length - 1];
  if (lastMsg.role === "user") {
    const hasAttachments = attachments && attachments.length > 0;

    if (hasAttachments) {
      const contentBlocks: ClaudeContent[] = [];

      for (const att of attachments!) {
        if (att.mediaType === "application/pdf") {
          // PDF → Claude document block (native PDF reading)
          contentBlocks.push({
            type: "document",
            source: { type: "base64", media_type: "application/pdf", data: att.base64 },
          });
        } else if (att.mediaType.startsWith("image/")) {
          // Image → Claude image block
          contentBlocks.push({
            type: "image",
            source: {
              type: "base64",
              media_type: att.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: att.base64,
            },
          });
        }
      }

      // Build text content
      let text = lastMsg.content || "";
      if (fileNames && fileNames.length > 0) {
        text += `\n\n[Additional files referenced (content not parsed): ${fileNames.join(", ")}]`;
      }

      // Add an audit-trigger instruction when PDFs are present and user didn't specify
      const hasPDF = attachments!.some((a) => a.mediaType === "application/pdf");
      if (hasPDF && !text.trim()) {
        text = "Please analyze this document and produce a full audit brief, identify discrepancies against PKSF standards, and provide recommendations.";
      }

      contentBlocks.push({ type: "text", text: text || "(see attached documents)" });
      messages.push({ role: "user", content: contentBlocks });
    } else {
      let text = lastMsg.content;
      if (fileNames && fileNames.length > 0) {
        text += `\n\n[Files referenced: ${fileNames.join(", ")}]`;
      }
      messages.push({ role: "user", content: text });
    }
  }

  // ── Step 1: Agentic tool-use loop — get conversational answer ──
  // Claude uses tools freely and returns a plain prose answer.
  // No panel formatting is required here — that happens in Step 2.
  let iterations = 0;
  const MAX_ITERATIONS = 5;
  const collectedToolData: string[] = []; // accumulate tool results for Step 2

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: getSystemPrompt(personaId ?? "assistant"),
      tools: FREYA_TOOLS,
      messages: messages as Anthropic.MessageParam[],
    });

    // If Claude wants to use tools
    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
      );

      // Execute all requested tools in parallel
      const toolResults = await Promise.all(
        toolUseBlocks.map(async (toolBlock) => {
          const result = await executeTool(
            toolBlock.name,
            toolBlock.input as Record<string, unknown>
          );
          // Collect tool data for panel generation
          collectedToolData.push(`[${toolBlock.name}]: ${result}`);
          return {
            type: "tool_result" as const,
            tool_use_id: toolBlock.id,
            content: result,
          };
        })
      );

      // Append assistant message with tool use + user message with results
      messages.push({ role: "assistant", content: response.content as ClaudeContent[] });
      messages.push({ role: "user", content: toolResults });
      continue;
    }

    // Claude is done — extract final text response
    const textBlock = response.content.find(
      (b): b is Anthropic.TextBlock => b.type === "text"
    );

    if (!textBlock) {
      throw new Error("No text response from Freya agent");
    }

    // Clean up the answer — strip any leftover delimiter markers if present
    let answer = textBlock.text.trim();
    const answerMatch = answer.match(/<<ANSWER>>([\s\S]*?)<<END_ANSWER>>/i);
    if (answerMatch) answer = answerMatch[1].trim();
    // Strip JSON wrapper if present
    if (answer.startsWith("{") && answer.includes('"answer"')) {
      try {
        const parsed = JSON.parse(answer) as { answer?: string };
        if (parsed.answer) answer = parsed.answer;
      } catch { /* keep raw */ }
    }

    console.log(`[Freya] Step 1 answer length=${answer.length}, tool calls=${collectedToolData.length}`);

    // ── Step 2: Generate HTML panels from the answer ──
    // Determine user query from last user message
    const lastUserMsg = conversationHistory[conversationHistory.length - 1];
    const userQuery = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : "";

    // Only generate panels for substantive queries (not greetings/navigation)
    const isSubstantive = userQuery.length > 10 &&
      !["hi", "hello", "hey", "thanks", "thank you", "ok", "okay"].some(g =>
        userQuery.toLowerCase().trim() === g
      );

    const panels = isSubstantive
      ? await generatePanels(userQuery, answer, collectedToolData.join("\n\n"))
      : [];

    return { answer, panels };
  }

  return {
    answer: "I reached the maximum analysis depth. Please try a more specific question.",
    panels: [],
  };
}

// ── Two-Phase: Answer Only ───────────────────────────────────

export interface FreyaAnswerResult {
  answer: string;
  userQuery: string;
  toolData: string;
}

/**
 * Phase 1 only: runs the agentic loop and returns the answer text plus
 * raw tool data.  Does NOT call generatePanels — panels are generated
 * separately by the /api/panels route.
 */
export async function runFreyaAgentAnswer(
  conversationHistory: AgentMessage[],
  attachments?: FileAttachment[],
  fileNames?: string[],
  personaId?: string
): Promise<FreyaAnswerResult> {
  // Build message list for the API
  const messages: ClaudeMessage[] = conversationHistory.slice(0, -1).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  // Handle last user message with possible attachments
  const lastMsg = conversationHistory[conversationHistory.length - 1];
  if (lastMsg.role === "user") {
    const hasAttachments = attachments && attachments.length > 0;

    if (hasAttachments) {
      const contentBlocks: ClaudeContent[] = [];

      for (const att of attachments!) {
        if (att.mediaType === "application/pdf") {
          contentBlocks.push({
            type: "document",
            source: { type: "base64", media_type: "application/pdf", data: att.base64 },
          });
        } else if (att.mediaType.startsWith("image/")) {
          contentBlocks.push({
            type: "image",
            source: {
              type: "base64",
              media_type: att.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: att.base64,
            },
          });
        }
      }

      let text = lastMsg.content || "";
      if (fileNames && fileNames.length > 0) {
        text += `\n\n[Additional files referenced (content not parsed): ${fileNames.join(", ")}]`;
      }

      const hasPDF = attachments!.some((a) => a.mediaType === "application/pdf");
      if (hasPDF && !text.trim()) {
        text = "Please analyze this document and produce a full audit brief, identify discrepancies against PKSF standards, and provide recommendations.";
      }

      contentBlocks.push({ type: "text", text: text || "(see attached documents)" });
      messages.push({ role: "user", content: contentBlocks });
    } else {
      let text = lastMsg.content;
      if (fileNames && fileNames.length > 0) {
        text += `\n\n[Files referenced: ${fileNames.join(", ")}]`;
      }
      messages.push({ role: "user", content: text });
    }
  }

  // ── Agentic tool-use loop ──
  let iterations = 0;
  const MAX_ITERATIONS = 5;
  const collectedToolData: string[] = [];

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: getSystemPrompt(personaId ?? "assistant"),
      tools: FREYA_TOOLS,
      messages: messages as Anthropic.MessageParam[],
    });

    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
      );

      const toolResults = await Promise.all(
        toolUseBlocks.map(async (toolBlock) => {
          const result = await executeTool(
            toolBlock.name,
            toolBlock.input as Record<string, unknown>
          );
          collectedToolData.push(`[${toolBlock.name}]: ${result}`);
          return {
            type: "tool_result" as const,
            tool_use_id: toolBlock.id,
            content: result,
          };
        })
      );

      messages.push({ role: "assistant", content: response.content as ClaudeContent[] });
      messages.push({ role: "user", content: toolResults });
      continue;
    }

    // Claude is done — extract final text response
    const textBlock = response.content.find(
      (b): b is Anthropic.TextBlock => b.type === "text"
    );

    if (!textBlock) {
      throw new Error("No text response from Freya agent");
    }

    let answer = textBlock.text.trim();
    const answerMatch = answer.match(/<<ANSWER>>([\s\S]*?)<<END_ANSWER>>/i);
    if (answerMatch) answer = answerMatch[1].trim();
    if (answer.startsWith("{") && answer.includes('"answer"')) {
      try {
        const parsed = JSON.parse(answer) as { answer?: string };
        if (parsed.answer) answer = parsed.answer;
      } catch { /* keep raw */ }
    }

    const lastUserMsg = conversationHistory[conversationHistory.length - 1];
    const userQuery = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : "";

    console.log(`[Freya] Answer-only: length=${answer.length}, tool calls=${collectedToolData.length}`);

    return {
      answer,
      userQuery,
      toolData: collectedToolData.join("\n\n"),
    };
  }

  return {
    answer: "I reached the maximum analysis depth. Please try a more specific question.",
    userQuery: "",
    toolData: "",
  };
}
