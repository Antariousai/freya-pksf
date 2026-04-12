/**
 * PKSF Knowledge Base — structured content chunks for Freya's RAG pipeline.
 * Each entry is seeded into the `kb_documents` Supabase table.
 */

export interface KBChunk {
  title: string;
  category: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export const PKSF_KNOWLEDGE_BASE: KBChunk[] = [
  // ── OVERVIEW ──────────────────────────────────────────────
  {
    title: "PKSF Overview and Mission",
    category: "overview",
    content: `Palli Karma-Sahayak Foundation (PKSF) is Bangladesh's apex microfinance institution and a statutory body established by the Government of Bangladesh in 1990. PKSF functions as a second-tier institution: it channels funds to grassroots Partner Organizations (POs), which in turn deliver microcredit and development services to the rural poor.

PKSF's mandate is poverty alleviation through financial inclusion, sustainable livelihoods, and social empowerment. It is governed by a 13-member Board of Governors appointed by the Government and operates under the Ministry of Finance.

Key facts (FY2024-25):
- Total Disbursement: BDT 93.58 Billion (+23.89% YoY)
- Active Partner Organizations: 278
- Total Members: 20.7 Million (93.67% women)
- Active Borrowers: 15.8 Million
- Portfolio Outstanding: BDT 858.29 Billion
- Recovery Rate: 99.21%

PKSF is internationally recognized as a model apex institution and receives funding from World Bank, ADB, IFAD, EU, USAID, and bilateral donors.`,
    metadata: { importance: "critical", tags: ["overview", "mandate", "stats"] },
  },

  {
    title: "PKSF History and Legal Framework",
    category: "overview",
    content: `PKSF was incorporated on 29 May 1990 under the Companies Act 1913 as a not-for-profit company guaranteed by the Government of Bangladesh. It started operations in 1991 with an initial capital of BDT 150 million from the Government.

Over three decades PKSF has evolved from a credit wholesaler to a comprehensive development institution. It manages multi-donor funded projects, conducts research, develops financial products for ultra-poor populations, and leads digital financial inclusion initiatives.

PKSF is regulated under the Microcredit Regulatory Authority (MRA) framework for its POs, though PKSF itself reports directly to the Ministry of Finance.

Key milestones:
- 1991: First loan disbursed to POs
- 1996: Introduced Program for the Poorest (PP)
- 2005: ENRICH program launched for holistic village development
- 2012: Began climate finance and disaster-resilient microfinance
- 2018: Digital Financial Services (DFS) piloting with POs
- 2023: RAISE project ($530M World Bank) launched
- 2024: AI-powered portfolio monitoring piloted (Freya system)`,
    metadata: { importance: "high", tags: ["history", "legal", "milestones"] },
  },

  // ── PROGRAMS ──────────────────────────────────────────────
  {
    title: "PKSF Program Portfolio — Agrosor and Jagoron",
    category: "program",
    content: `PKSF delivers credit through five flagship programs:

AGROSOR (Agriculture & Agri-Business) — 48.49% of portfolio
The largest program, targeting agricultural credit for crop cultivation, livestock, fisheries, and agro-processing. Average loan size: BDT 65,000. Interest rate ceiling: 24% (declining). Focused on smallholder farmers and agri-entrepreneurs. Significant climate-adaptive component added in 2022.

JAGORON (Livelihood Development) — 32.14% of portfolio
Supports income-generating activities beyond agriculture: small trade, cottage industry, transport, service sector. Average loan size: BDT 45,000. The program has the widest geographic spread across 64 districts. Features graduated lending — borrowers move through tiers as repayment history improves.`,
    metadata: { importance: "high", tags: ["programs", "agrosor", "jagoron", "agriculture"] },
  },

  {
    title: "PKSF Program Portfolio — Sufolon, Buniad, and Specialty Programs",
    category: "program",
    content: `SUFOLON (Afforestation & Environment) — 6.09% of portfolio
Green microfinance for tree plantation, nursery development, homestead gardening, and bio-gas. Aligned with Bangladesh's nationally determined contributions (NDC) under Paris Agreement. PKSF is partnering with the Forest Department.

BUNIAD (Ultra-Poor Program) — 0.99% of portfolio
Serving the extreme poor who cannot access regular microcredit. Bundled with asset transfers, training, healthcare support, and social integration. Graduation model — beneficiaries move to Jagoron after 18-24 months. Funded through LIFT/RISE grants.

SPECIALTY PROGRAMS — 12.29%:
- ENRICH: Holistic village development (land, livelihood, health, education)
- CES (Commercial Enterprise Sector): SME and enterprise finance through commercial banks. Total BDT 1,000 Crore portfolio across NCC, Sonali, Agrani, Janata, BASIC banks.
- Digital Financial Services: Mobile banking access for rural PO members
- Disability-Inclusive Finance: Microfinance for persons with disabilities`,
    metadata: { importance: "high", tags: ["programs", "sufolon", "buniad", "ultra-poor", "CES"] },
  },

  // ── MD PROFILE ────────────────────────────────────────────
  {
    title: "Managing Director Profile — Dr. Mohammad Jashim Uddin",
    category: "md_profile",
    content: `Dr. Mohammad Jashim Uddin is the Managing Director of PKSF, appointed by the Government of Bangladesh. He brings 28 years of experience in development finance, poverty economics, and institutional management.

Professional Background:
- PhD, Development Economics, University of Dhaka (1998)
- Post-doctoral research, International Food Policy Research Institute (IFPRI), Washington DC
- Former Joint Secretary, Economic Relations Division, Ministry of Finance
- Former Country Director, UNCDF Bangladesh (UN Capital Development Fund)
- Former Advisor, Bangladesh Bank Financial Inclusion Wing

Key Priorities at PKSF:
1. RAISE Project Governance: Ensuring World Bank compliance for the $530M IDA credit — IFR submissions, procurement audits, and safeguard reporting
2. JCF Crisis Management: Handling the Jagorani Chakra Foundation's deteriorating portfolio (PAR30 at 4.2%, critical audit findings including misappropriation)
3. Digital Transformation: Rolling out MIS upgrades across 278 POs and piloting the Freya AI analytics system
4. Climate Resilience Finance: Expanding Sufolon and agri-adaptive credit; Sylhet flood impact mitigation
5. SMART Project Recovery: Addressing ADB underspend (41% burn rate) before Q3 review

Daily Briefing Preferences:
- Reviews portfolio KPIs every morning at 8:30 AM
- Receives weekly PO compliance digest on Sundays
- Monthly Board presentations use PKSF Intelligence Dashboard
- Prefers data in BDT Crore for small figures, BDT Billion for large portfolio numbers
- Follows Bangladesh Bank circulars closely for interest rate and compliance changes

Personal Context:
- Resides in Dhaka (Gulshan-2)
- Fluent in Bengali, English, and conversational Hindi
- Keen on data visualization and evidence-based policy
- Chairs PKSF's Risk Management Committee
- Represents Bangladesh in APRACA (Asia Pacific Rural and Agricultural Credit Association) meetings`,
    metadata: { importance: "critical", tags: ["md", "managing director", "jashim", "leadership"] },
  },

  // ── PO PROFILES ───────────────────────────────────────────
  {
    title: "Partner Organization — BRAC (Tier A)",
    category: "po",
    content: `BRAC is PKSF's largest and highest-performing Partner Organization.

Performance Metrics (June 2025):
- Tier: A | Compliance Grade: A
- Recovery Rate: 99.8% (consistently above 99.5% for 5 years)
- PAR30: 0.2% (industry best)
- Compliance Score: 95/100
- Total Members: 3.2 Million | Active Borrowers: 2.4 Million
- Outstanding Portfolio: BDT 48.2 Billion
- Trend: Stable

BRAC is headquartered in Dhaka and operates in all 64 districts. It has a dedicated MIS system integrated with PKSF's monitoring platform. Zero critical audit findings in last 3 annual reviews. BRAC also participates in PKSF's ENRICH and ultra-poor programs.`,
    metadata: { importance: "high", tags: ["brac", "po", "tier-a", "portfolio"] },
  },

  {
    title: "Partner Organization — ASA (Tier A)",
    category: "po",
    content: `ASA (Association for Social Advancement) is the second-largest PKSF partner.

Performance Metrics (June 2025):
- Tier: A | Compliance Grade: A
- Recovery Rate: 99.7%
- PAR30: 0.3%
- Compliance Score: 93/100
- Total Members: 2.8 Million
- Outstanding: BDT 42.1 Billion
- Trend: Stable

ASA is known for its highly standardized branch model. Very low operating costs. Strong rural penetration in northern Bangladesh. ASA's digital transformation is ahead of most POs — mobile collection covers 68% of branches.`,
    metadata: { importance: "high", tags: ["asa", "po", "tier-a", "portfolio"] },
  },

  {
    title: "CRITICAL — Jagorani Chakra Foundation (JCF) — Tier C, High Risk",
    category: "po",
    content: `JCF (Jagorani Chakra Foundation) is PKSF's highest-risk active PO. Immediate MD attention required.

Performance Metrics (June 2025):
- Tier: C (downgraded from B in March 2025)
- Compliance Grade: D (58/100) — FAILING
- Recovery Rate: 96.8% — CRITICAL (was 97.9% last quarter, threshold: 98%)
- PAR30: 4.2% — DANGEROUS (threshold: 2%)
- Active Members: ~420,000 | Outstanding: BDT 8.4 Billion
- Trend: Deteriorating rapidly

Critical Audit Findings (April 2025 audit):
1. CRITICAL — Misappropriation of BDT 42 Lakhs by Branch Manager in Jessore cluster (filed FIR, case pending)
2. CRITICAL — MIS data manipulation: 847 accounts showing false repayment status
3. Moderate — Staff turnover 34% in last 12 months (industry avg 12%)
4. Moderate — Inadequate loan appraisal documentation for 23% of files reviewed

Current Status: PROBATIONARY — JCF disbursements suspended pending remediation plan
Required Actions by MD:
- Approve recovery action plan submitted by JCF board (deadline: 15 July 2025)
- Decide on collateral liquidation for Jessore cluster NPL (BDT 2.3 Crore)
- Board meeting scheduled: 20 July 2025 for final determination`,
    metadata: { importance: "critical", tags: ["jcf", "po", "risk", "fraud", "probationary", "critical"] },
  },

  {
    title: "Partner Organization — TMSS (Tier A, Improving)",
    category: "po",
    content: `TMSS (Thengamara Mohila Sabuj Sangha) — women-led PO based in Bogura.

Performance Metrics (June 2025):
- Tier: A | Compliance Score: 91/100
- Recovery Rate: 99.5%
- PAR30: 0.5%
- Members: 890,000 | Outstanding: BDT 15.6 Billion
- Trend: Improving

TMSS specializes in women's empowerment and skills development integrated with microfinance. Strong presence in northern Bangladesh. Recently added a solar energy loan product under Sufolon program. Board governance rated excellent by last audit.`,
    metadata: { importance: "medium", tags: ["tmss", "po", "tier-a", "women"] },
  },

  {
    title: "Partner Organization — ESDO (Tier B, Watch)",
    category: "po",
    content: `ESDO (Eco-Social Development Organization) — Thakurgaon-based PO.

Performance Metrics (June 2025):
- Tier: B | Compliance Score: 78/100
- Recovery Rate: 98.9% (declining from 99.3% — 3 quarter trend)
- PAR30: 1.1% (rising)
- Members: 560,000 | Outstanding: BDT 9.8 Billion
- Trend: Declining — WATCH

Root cause analysis: Drought-affected Barind Tract (Rajshahi, Chapainawabganj) accounts for 60% of PAR increase. ESDO has requested emergency restructuring for 2,340 borrowers. Freya recommends approval with conditions: enhanced monitoring, monthly field visit by PKSF officers.`,
    metadata: { importance: "medium", tags: ["esdo", "po", "tier-b", "watch", "barind"] },
  },

  {
    title: "Partner Organizations — Padakhep, Shakti, BURO Bangladesh",
    category: "po",
    content: `PADAKHEP MANABIK UNNAYAN KENDRA — Tier B
- Recovery Rate: 98.2% | PAR30: 1.8%
- Compliance: 72/100 | Members: 320,000
- Issue: High staff turnover (28%) impacting collection efficiency. Branches in Mymensingh and Netrokona most affected. HR intervention recommended.

SHAKTI FOUNDATION FOR DISADVANTAGED WOMEN — Tier A
- Recovery Rate: 99.3% | PAR30: 0.7%
- Compliance: 88/100 | Members: 680,000
- Specializes in urban microfinance (Dhaka, Chittagong slums). Strong performance, clean audit.

BURO BANGLADESH — Tier B
- Recovery Rate: 98.7% | PAR30: 1.3%
- Compliance: 80/100 | Members: 445,000
- Headquartered Tangail. Moderate PAR — under enhanced monitoring since Feb 2025. Compliance improving.`,
    metadata: { importance: "medium", tags: ["padakhep", "shakti", "buro", "po", "tier-b"] },
  },

  // ── PROJECTS ──────────────────────────────────────────────
  {
    title: "RAISE Project — World Bank $530 Million IDA",
    category: "project",
    content: `RAISE (Resilient Agri-finance and Institutional Strengthening for Entrepreneurs) is PKSF's flagship development project, funded by World Bank IDA.

Project Details:
- Total Financing: USD 530 Million (IDA Credit)
- Duration: 2023–2028
- Burn Rate: 82% of Year-2 allocation
- Status: ON TRACK

Components:
1. Component A — Climate-Adaptive Agricultural Finance: USD 280M — subloans to agri-focused POs
2. Component B — Institutional Strengthening: USD 120M — MIS, training, fiduciary systems
3. Component C — Digital Financial Inclusion: USD 80M — DFS rollout, mobile banking
4. Component D — Project Management & M&E: USD 50M

CRITICAL ALERT for MD:
- Interim Financial Report (IFR) due in 18 days (deadline: 1 August 2025)
- IFR covers April–June 2025 quarter
- World Bank disbursement of USD 45 million contingent on IFR approval
- PIU (Project Implementation Unit) at PKSF has draft ready — needs MD sign-off
- Environmental & Social Framework (ESF) compliance review pending

Key contacts: Task Team Leader at World Bank — Mr. Samuel Taffesse (Dhaka office)`,
    metadata: { importance: "critical", tags: ["RAISE", "world bank", "IDA", "IFR", "project", "critical"] },
  },

  {
    title: "SMART Project — ADB $100 Million (At Risk)",
    category: "project",
    content: `SMART (Sustainable Microfinance for Agricultural Resilience and Transformation) — ADB funded.

Project Details:
- Financing: USD 100 Million (ADB loan + grant)
- Duration: 2021–2026
- Burn Rate: 41% — SIGNIFICANTLY UNDERSPENT
- Status: AT RISK

Issue: SMART was originally designed with a procurement-heavy first year. Several equipment procurements were delayed due to national tariff changes affecting import costs. As of June 2025, 41% of total project funds used but Year-4 begins August 2025.

Actions Required:
- ADB Country Mission scheduled Q3 2025 — MD meeting required
- Revised procurement plan submitted but ADB hasn't approved revised unit costs
- Risk: If burn rate doesn't reach 65% by December 2025, ADB may restructure/cancel USD 35M

MD Note: SMART covers the climate-resilient livelihood component critical for the Barind Tract and coastal POs. Cancellation would impact ESDO and 3 coastal POs.`,
    metadata: { importance: "high", tags: ["SMART", "ADB", "underspend", "at-risk", "project"] },
  },

  {
    title: "RMTP, REOPA, PROSPER and Other Development Projects",
    category: "project",
    content: `RMTP (Rural Microenterprise Transformation Project) — IFAD $80M
- Burn Rate: 94% | Status: CLOSING PHASE
- Final accounts submission deadline: September 2025
- IFAD completion mission scheduled August 2025
- Strong performance — IFAD has expressed interest in follow-on project (RMTP-2)

REOPA (Rural Employment and Renewable Energy Project) — EU/DFID $45M
- Burn Rate: 67% | Status: ON TRACK
- Covers solar irrigation, biogas, and rural energy access
- Mid-term review positive — EU proposing EUR 15M extension

PROSPER (Promoting Sustained Poverty Elimination for Rural Households) — USAID $35M
- Burn Rate: 55% | Status: ON TRACK
- Focused on ultra-poor graduation and resilient livelihoods
- Quarterly USAID review due July 30

PACE-B (Private Agricultural Capital Extension — Bangladesh) — SwissContact $22M
- Burn Rate: 78% | Status: ON TRACK
- Agri-value chain finance in maize, rice, and horticulture

KATALYST III — SDC $18M
- Burn Rate: 89% | Status: AT RISK
- Low disbursement quality flagged by SDC auditors — documentation gaps

JEEON (Joint Ecosystem for Enabling Opportunities & Nutrition) — FCDO $15M
- Burn Rate: 45% | Status: ON TRACK
- Nutrition-integrated microfinance pilot — results positive`,
    metadata: { importance: "medium", tags: ["RMTP", "REOPA", "PROSPER", "IFAD", "EU", "USAID", "projects"] },
  },

  // ── FINANCIAL ─────────────────────────────────────────────
  {
    title: "CES Banking — Commercial Enterprise Sector Portfolio",
    category: "financial",
    content: `PKSF's Commercial Enterprise Sector (CES) channels funds through commercial banks for SME and enterprise finance (non-MFI segment).

Total CES Portfolio: BDT 1,000 Crore (June 2025)

Bank-wise Utilization:
- NCC Bank: BDT 200 Cr allocated | BDT 160 Cr utilized (80%) — NEAR CEILING, expansion needed
- Sonali Bank: BDT 250 Cr | BDT 175 Cr (70%) — adequate headroom
- Agrani Bank: BDT 200 Cr | BDT 130 Cr (65%) — moderate utilization
- Janata Bank: BDT 200 Cr | BDT 110 Cr (55%) — underutilized, review needed
- BASIC Bank: BDT 150 Cr | BDT 72 Cr (48%) — lowest utilization, BASIC Bank NPL concern

CES Issues:
- BASIC Bank's own NPL ratio at 42% — PKSF credit committee reviewing further exposure
- NCC Bank nearing ceiling — request for BDT 50 Cr additional allocation submitted
- Janata Bank delay in fund release (liquidity issue flagged by bank's treasury)`,
    metadata: { importance: "high", tags: ["CES", "banks", "NCC", "Sonali", "Agrani", "BASIC", "financial"] },
  },

  {
    title: "Fund Source Utilization — Donor Funds",
    category: "financial",
    content: `PKSF manages multiple fund sources with distinct utilization rates (June 2025):

IDA-RAISE Fund: USD 280M allocated | USD 230M utilized (82%) — On track
ADB-SMART Fund: USD 100M allocated | USD 41M utilized (41%) — Underspent, at risk
IFAD-RMTP: USD 80M | USD 75.2M (94%) — Closing phase
EU-REOPA: EUR 45M | EUR 30.15M (67%) — Normal
USAID-PROSPER: USD 35M | USD 19.25M (55%) — Normal
GoB Revolving Fund: BDT 8,500 Crore | BDT 7,225 Crore (85%) — Main PKSF fund
PKSF Own Resources: BDT 2,200 Crore | BDT 1,870 Crore (85%) — Equity-funded lending

Total portfolio liquidity: BDT 780 Crore available for disbursement in Q1 FY2025-26
Projected disbursement target FY2025-26: BDT 110 Billion (+17.6% over FY2024-25)`,
    metadata: { importance: "high", tags: ["funds", "donors", "utilization", "IDA", "ADB", "IFAD", "financial"] },
  },

  {
    title: "Recovery Rate Analysis and PAR Metrics",
    category: "financial",
    content: `PKSF Portfolio Quality — June 2025:

Overall Recovery Rate: 99.21% (excellent; threshold 98%)
Portfolio-at-Risk (PAR30): 0.94% (system-wide; threshold 2%)
Non-Performing Loans (PAR90): 0.42%
Write-off Rate: 0.08% (very low)

Sector breakdown:
- Agrosor (Agriculture): Recovery 98.9%, PAR30 1.2% (seasonal stress in Barind)
- Jagoron (Livelihood): Recovery 99.4%, PAR30 0.7%
- Sufolon (Afforestation): Recovery 99.1%, PAR30 0.9%
- Buniad (Ultra-Poor): Recovery 97.8%, PAR30 2.1% (acceptable given target group)

Trend Alert: 3 consecutive quarters of PAR30 increase in agricultural segment — monsoon and drought impacts. Flood impact in Sylhet may add 0.3-0.5 percentage points to PAR30 in Q2 FY2025-26.

Benchmarks: PKSF's recovery rate is among the top 3 apex MFIs globally.`,
    metadata: { importance: "high", tags: ["recovery", "PAR", "NPL", "portfolio quality", "financial"] },
  },

  // ── RISK ──────────────────────────────────────────────────
  {
    title: "Sylhet Flood Risk — Disaster Impact on PKSF Portfolio",
    category: "risk",
    content: `Sylhet Division Flood Emergency — June 2025:

River Monitoring Status:
- Surma River at Sylhet Sadar: 10.82m — ABOVE DANGER LEVEL (10.50m). Worst flood since 2022.
- Kushiyara at Sherpur: 9.14m — ABOVE DANGER LEVEL (9.00m)
- Old Surma at Sunamganj: 7.80m — AT WARNING LEVEL (7.20m)
- Manu River at Moulvibazar: 8.30m — Approaching warning (7.80m)

PKSF Borrower Exposure:
- Estimated 340 active borrowers in flood-inundated zones (confirmed by PO field reports)
- POs affected: TMSS (120 borrowers in Sylhet), JCF (89 borrowers in Sunamganj), ESDO (67), Padakhep (44), ASA (20)
- Portfolio at risk: BDT 28–42 Crore (estimated)
- Assets destroyed: livestock, crops, small businesses

Response Protocol:
1. PKSF Disaster Management Cell activated (24 July 2025)
2. Emergency loan rescheduling approved for verified flood-affected borrowers (90-day moratorium)
3. Disaster relief fund: BDT 5 Crore allocated from PKSF corpus
4. Field verification teams deployed — final count expected 28 July 2025
5. Insurance claims pending under PKSF's agriculture insurance pilot (28 borrowers covered)`,
    metadata: { importance: "critical", tags: ["flood", "Sylhet", "disaster", "risk", "river", "emergency"] },
  },

  {
    title: "Governance, Compliance, and Audit Framework",
    category: "governance",
    content: `PKSF Governance and Compliance Structure:

Board of Governors: 13 members (Government + civil society + donor nominees)
- Chair: Secretary, Ministry of Finance (ex-officio)
- Managing Director: Dr. Mohammad Jashim Uddin (CEO)
- Key Board Committees: Audit, Risk Management, HR, Investment

Annual Audit:
- External Auditor: ACNABIN Chartered Accountants
- Internal Audit Wing: 12 auditors covering all POs on rotation
- World Bank Fiduciary Team: Quarterly reviews for RAISE project
- ADB Compliance Team: Semi-annual reviews for SMART

PO Compliance Framework:
- Tier A: Compliance score 85-100 | Annual audit + 6-month desk review
- Tier B: Compliance score 70-84 | Semi-annual audit + monthly reporting
- Tier C: Compliance score 55-69 | Quarterly audit + weekly monitoring
- Tier D: Compliance score <55 | Probationary — disbursement suspension

MRA (Microcredit Regulatory Authority) compliance: PKSF submits consolidated PO data quarterly.
Bangladesh Bank liaison: PKSF coordinates with Bangladesh Bank on interest rate caps and AML compliance.

Current compliance concerns:
1. JCF: Grade D — probationary, judicial referral for misappropriation case
2. KATALYST III: Documentation gaps — SDC audit recommendation pending
3. 14 POs with overdue audit reports (>30 days) — reminders issued`,
    metadata: { importance: "high", tags: ["governance", "compliance", "audit", "board", "MRA"] },
  },

  {
    title: "Digital Transformation and MIS at PKSF",
    category: "governance",
    content: `PKSF Digital Transformation Roadmap (2023-2026):

1. MIS Modernization: Upgrading 278 POs to PKSF's MicroStar MIS platform. Current adoption: 189 POs (68%). Target: 100% by December 2025. Challenge: 34 very small POs lack IT infrastructure.

2. Digital Financial Services (DFS): Mobile wallet integration for PO members. Partnered with bKash, Nagad, and Rocket. Currently 2.1 million members have mobile wallet linked. Target: 8 million by 2026.

3. Freya AI System: PKSF's AI-powered financial intelligence platform (built on Antarious AI by SocioFi Technology). Provides real-time portfolio monitoring, risk alerts, and natural language analysis for senior management. Currently in demo/pilot phase — MD is primary user.

4. Geo-tagging: All PO branch locations and borrower clusters geo-tagged. Live disaster impact assessment via GIS when floods/cyclones occur.

5. E-KYC: Digital Know-Your-Customer for new borrower onboarding. Pilot with 12 POs using NID verification API from Bangladesh National Identity Registration Authority (NIDRA).

Investment in digital: BDT 85 Crore allocated from RAISE Component B for ICT infrastructure.`,
    metadata: { importance: "medium", tags: ["digital", "MIS", "technology", "DFS", "AI", "Freya"] },
  },

  {
    title: "PKSF Social Impact and Gender Mainstreaming",
    category: "overview",
    content: `Social Impact at Scale (FY2024-25):

Gender:
- 93.67% of all PKSF members are women
- Women-led household enterprises: 4.2 million (estimated)
- Women in leadership at PO level: 34% (board), 48% (field staff)
- TMSS and Shakti Foundation are entirely women-focused POs

Poverty Graduation:
- Ultra-Poor Buniad program: 128,000 households in current cohort
- Graduation rate from extreme poverty (Buniad to Jagoron): 71% (2024 cohort)
- PKSF-UNCDF joint study: PKSF members' per-capita income increased 38% over 5 years

Health and Education:
- ENRICH program covers 12,000 households in 24 villages
- ENRICH services: healthcare camps, school enrollment support, legal aid, livelihood training

Climate Resilience:
- 180,000 borrowers trained in climate-adaptive agriculture (RAISE Component A)
- 45,000 households adopted at least one climate-resilient practice
- PKSF hosts Bangladesh's largest MFI-linked crop insurance pilot (28,000 borrowers)

SDG Alignment:
- SDG 1 (No Poverty): Core mandate
- SDG 5 (Gender Equality): 93.67% women membership
- SDG 8 (Decent Work): Livelihood programs
- SDG 13 (Climate Action): Sufolon and climate finance`,
    metadata: { importance: "medium", tags: ["social impact", "gender", "poverty", "SDG", "ENRICH"] },
  },

  {
    title: "Psychometric and Institutional Health Profiling of POs",
    category: "governance",
    content: `PKSF's Behavioral Intelligence system assesses POs on 5 dimensions (each scored 0-20, total 100):

1. Financial Health (0-20): Recovery rates, PAR, NPL ratios, capital adequacy, loan loss provisioning
2. Governance Quality (0-20): Board composition, independence, audit compliance, transparency
3. Operational Resilience (0-20): Staff retention, branch efficiency, MIS quality, field supervision
4. Social Impact (0-20): Member income growth, women empowerment index, poverty graduation rates
5. Adaptive Capacity (0-20): Digital adoption rate, crisis response capability, product innovation

Current Institutional Profiles:
- JCF: Overall 48/100 — Financial Health: 8, Governance: 9, Ops: 11, Social: 12, Adaptive: 8 — HIGH RISK
- BRAC: Overall 92/100 — Financial: 20, Governance: 18, Ops: 20, Social: 17, Adaptive: 17 — STABLE
- ASA: Overall 88/100 — Financial: 19, Governance: 18, Ops: 18, Social: 16, Adaptive: 17 — STABLE
- TMSS: Overall 78/100 — Financial: 17, Governance: 15, Ops: 15, Social: 18, Adaptive: 13 — WATCH (improving)

This profiling informs PKSF's PO classification (Tier A/B/C/D) and intervention decisions.`,
    metadata: { importance: "medium", tags: ["psychometric", "profiling", "institutional", "PO health"] },
  },
];
