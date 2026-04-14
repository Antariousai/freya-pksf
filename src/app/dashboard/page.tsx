"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/use-auth";
import { apiFetch } from "@/lib/api-client";
import {
  Activity,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardCheck,
  Database,
  FileDown,
  Files,
  Globe,
  FileText,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle2,
  Clock3,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users2,
} from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import LeftPanel from "@/components/layout/LeftPanel";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import type { DashboardMetric, DashboardSnapshot, OperationsSnapshot, ProfilingSnapshot } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type BadgeStatus = React.ComponentProps<typeof StatusBadge>["status"];

function KPICard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconColor,
  iconBg,
}: DashboardMetric & {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <GlassCard>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={iconColor} strokeWidth={2} />
          </div>
          <span
            style={{
              color: trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#6a6a90",
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 600,
            }}
          >
            {change}
          </span>
        </div>
        <div
          style={{
            color: "var(--text-primary)",
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "2px",
          }}
        >
          {value}
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>{label}</div>
      </div>
    </GlassCard>
  );
}

const KPI_ICON_CONFIG: Record<
  string,
  { icon: React.ElementType; iconColor: string; iconBg: string }
> = {
  "knowledge-chunks": {
    icon: Database,
    iconColor: "#a78bfa",
    iconBg: "rgba(124,58,237,0.12)",
  },
  "unique-titles": {
    icon: Files,
    iconColor: "#10b981",
    iconBg: "rgba(16,185,129,0.12)",
  },
  "web-items": {
    icon: Globe,
    iconColor: "#06b6d4",
    iconBg: "rgba(6,182,212,0.12)",
  },
  "pdf-items": {
    icon: FileText,
    iconColor: "#f59e0b",
    iconBg: "rgba(245,158,11,0.12)",
  },
};

const PLACEHOLDER_KPIS: DashboardMetric[] = [
  { id: "knowledge-chunks", label: "Total Knowledge Chunks", value: "--", change: "Loading", trend: "stable" },
  { id: "unique-titles", label: "Unique Document/Page Titles", value: "--", change: "Loading", trend: "stable" },
  { id: "web-items", label: "Webpage Items", value: "--", change: "Loading", trend: "stable" },
  { id: "pdf-items", label: "PDF Items", value: "--", change: "Loading", trend: "stable" },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { count: number } }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(10,10,32,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "13px",
        }}
      >
        <p style={{ color: "#a0a0c0", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "#a78bfa", fontWeight: 600, marginBottom: "2px" }}>{payload[0].value}%</p>
        <p style={{ color: "var(--text-dim)", fontSize: "11px" }}>{payload[0].payload.count} documents</p>
      </div>
    );
  }
  return null;
};

function buildExecutiveTakeaways(snippet: string): string[] {
  const sentences = snippet
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 30);

  if (sentences.length === 0) {
    return [snippet];
  }

  return sentences.slice(0, 3);
}

function formatEventTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function DashboardLoader({ message }: { message: string }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-0)",
        padding: "24px",
      }}
    >
      <GlassCard>
        <div
          style={{
            width: "min(560px, calc(100vw - 48px))",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#06b6d4",
                boxShadow: "0 0 14px rgba(6,182,212,0.45)",
                animation: "pulse-green 1.2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Loading Dashboard
            </span>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>{message}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  height: "74px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>

          <div
            style={{
              height: "120px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
}

function ControlButton({
  active,
  onClick,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: "999px",
        border: `1px solid ${active ? "rgba(6,182,212,0.22)" : "rgba(255,255,255,0.08)"}`,
        background: active ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.03)",
        color: active ? "#06b6d4" : "var(--text-secondary)",
        padding: "7px 10px",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

export default function DashboardPage() {
  const { checked, authed } = useRequireAuth();
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardSnapshot | null>(null);
  const [operations, setOperations] = useState<OperationsSnapshot | null>(null);
  const [profiling, setProfiling] = useState<ProfilingSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveMode, setLiveMode] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [latestFilter, setLatestFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [selectedFeaturedId, setSelectedFeaturedId] = useState<string | null>(null);
  const [mdPreset, setMdPreset] = useState<"board" | "risk" | "approvals" | "operations" | "policy">("board");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dashboardRes = await apiFetch("/api/dashboard");
      if (!dashboardRes.ok) throw new Error("Failed to fetch dashboard data");

      const [dashboardData, operationsData, profilingData] = await Promise.all([
        dashboardRes.json() as Promise<DashboardSnapshot>,
        apiFetch("/api/operations")
          .then(async (res) => (res.ok ? ((await res.json()) as OperationsSnapshot) : null))
          .catch(() => null),
        apiFetch("/api/profiling")
          .then(async (res) => (res.ok ? ((await res.json()) as ProfilingSnapshot) : null))
          .catch(() => null),
      ]);

      setDashboard(dashboardData);
      setOperations(operationsData);
      setProfiling(profilingData);
    } catch (err) {
      console.error("Dashboard load failed", err);
      setError("Dashboard data could not be loaded from pksf_knowledge.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!checked || !authed) return;
    void loadDashboard();
  }, [checked, authed, loadDashboard]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!liveMode || !authed) return;
    const id = window.setInterval(() => {
      void loadDashboard();
    }, 60000);
    return () => window.clearInterval(id);
  }, [authed, liveMode, loadDashboard]);

  useEffect(() => {
    if (!dashboard?.featuredItems.length) return;
    setSelectedFeaturedId((current) => current ?? dashboard.featuredItems[0].id);
  }, [dashboard]);

  const alertIcons: Record<string, React.ElementType> = {
    critical: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const alertColors: Record<string, string> = {
    critical: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  };

  const kpis = dashboard?.kpis ?? PLACEHOLDER_KPIS;
  const distribution = dashboard?.distribution ?? [];
  const latestItems = dashboard?.latestItems ?? [];
  const featuredItems = dashboard?.featuredItems ?? [];
  const executiveCards = dashboard?.executiveCards ?? [];
  const filteredLatestItems =
    latestFilter === "all" ? latestItems : latestItems.filter((item) => item.severity === latestFilter);
  const selectedFeatured =
    featuredItems.find((item) => item.id === selectedFeaturedId) ?? featuredItems[0] ?? null;
  const featuredType = selectedFeatured?.badgeLabel === "PDF" ? "Document" : "Web page";
  const featuredTakeaways = selectedFeatured ? buildExecutiveTakeaways(selectedFeatured.snippet) : [];
  const featuredExecutiveSummary = selectedFeatured
    ? `${featuredType} from ${selectedFeatured.source}. Coverage is ${selectedFeatured.progressPct}%. Status is ${selectedFeatured.status.toUpperCase()}.`
    : "";

  const mdHealth = useMemo(() => {
    const statusScore = (status: "live" | "stable" | "watch") => {
      if (status === "live") return 100;
      if (status === "stable") return 70;
      return 40;
    };

    const readinessScores = [
      ...(dashboard?.readiness ?? []).map((item) => statusScore(item.status)),
      ...(operations?.readiness ?? []).map((item) => statusScore(item.status)),
      ...(profiling?.readiness ?? []).map((item) => statusScore(item.status)),
    ];

    const base =
      readinessScores.length > 0
        ? readinessScores.reduce((sum, score) => sum + score, 0) / readinessScores.length
        : 65;

    const criticalCount =
      (dashboard?.latestItems.filter((item) => item.severity === "critical").length ?? 0) +
      (operations?.alertItems.filter((item) => item.severity === "critical").length ?? 0);

    const highPriorityQueue = profiling?.queueItems.filter((item) => item.priority === "high").length ?? 0;
    const penalty = criticalCount * 8 + highPriorityQueue * 4;
    const score = Math.max(0, Math.min(100, Math.round(base - penalty)));

    const status: "live" | "stable" | "watch" = score >= 80 ? "live" : score >= 60 ? "stable" : "watch";
    return { score, status, criticalCount, highPriorityQueue };
  }, [dashboard?.latestItems, dashboard?.readiness, operations?.alertItems, operations?.readiness, profiling?.queueItems, profiling?.readiness]);

  const mdDomainStatus = useMemo<Array<{ id: string; label: string; icon: React.ElementType; status: BadgeStatus; detail: string }>>(() => {
    const projectReadiness = dashboard?.readiness.find((item) => item.id === "projects")?.status ?? "watch";
    const departmentsReadiness = operations?.readiness.find((item) => item.id === "departments")?.status ?? "watch";
    const poWatchCount = operations?.poRows.filter((row) => row.status === "watch").length ?? 0;
    const operationAlerts = operations?.alertItems.length ?? 0;
    const highQueue = profiling?.queueItems.filter((item) => item.priority === "high").length ?? 0;
    const beneficiarySignal = profiling?.summaryCards.find((item) => /borrowers|scope/i.test(item.title));
    const policyCritical = dashboard?.latestItems.filter((item) => item.severity === "critical").length ?? 0;

    return [
      {
        id: "departments",
        label: "Departments",
        icon: BriefcaseBusiness,
        status: departmentsReadiness,
        detail: `${operations?.departmentItems.length ?? 0} units tracked; ${operations?.readiness.length ?? 0} readiness checks active.`,
      },
      {
        id: "projects",
        label: "Projects",
        icon: ClipboardCheck,
        status: projectReadiness,
        detail: `${dashboard?.actionItems.length ?? 0} strategic actions currently in queue.`,
      },
      {
        id: "ops",
        label: "Daily Operations",
        icon: Activity,
        status: operationAlerts > 4 ? "watch" : operationAlerts > 0 ? "stable" : "live",
        detail: `${operationAlerts} active operational exceptions across the network.`,
      },
      {
        id: "approvals",
        label: "Tasks & Approvals",
        icon: ShieldAlert,
        status: highQueue > 0 ? "watch" : "stable",
        detail: `${highQueue} high-priority approvals/tasks require MD attention.`,
      },
      {
        id: "meetings",
        label: "Meetings & Schedules",
        icon: CalendarClock,
        status: "stable" as const,
        detail: "Calendar integration is pending; governance updates currently routed via latest feed.",
      },
      {
        id: "po",
        label: "PO Network",
        icon: Users2,
        status: poWatchCount > 0 ? "watch" : "live",
        detail: `${operations?.poRows.length ?? 0} PO entities monitored; ${poWatchCount} in watch state.`,
      },
      {
        id: "beneficiary",
        label: "Beneficiaries",
        icon: Users2,
        status: beneficiarySignal ? "live" : "stable",
        detail: beneficiarySignal ? `${beneficiarySignal.value} currently in profile scope.` : "Beneficiary scope signal available in psychometric module.",
      },
      {
        id: "policy",
        label: "Strategy & Policy",
        icon: FileText,
        status: policyCritical > 0 ? "watch" : "stable",
        detail: `${dashboard?.latestItems.length ?? 0} recent source updates; ${policyCritical} critical policy signals.`,
      },
    ];
  }, [dashboard?.actionItems.length, dashboard?.latestItems, dashboard?.readiness, operations?.alertItems.length, operations?.departmentItems.length, operations?.poRows, operations?.readiness, profiling?.queueItems, profiling?.summaryCards]);

  const mdUrgentQueue = useMemo(() => {
    const urgentFromDashboard = (dashboard?.latestItems ?? [])
      .filter((item) => item.severity === "critical" || item.severity === "warning")
      .slice(0, 4)
      .map((item) => ({ id: `dash-${item.id}`, title: item.title, detail: item.detail, severity: item.severity }));

    const urgentFromOps = (operations?.alertItems ?? [])
      .filter((item) => item.severity === "critical" || item.severity === "warning")
      .slice(0, 4)
      .map((item) => ({ id: `ops-${item.id}`, title: item.title, detail: item.detail, severity: item.severity }));

    return [...urgentFromDashboard, ...urgentFromOps].slice(0, 6);
  }, [dashboard?.latestItems, operations?.alertItems]);

  const approvalsBoard = useMemo(() => {
    const items = [
      ...(dashboard?.actionItems ?? []).map((item, idx) => ({
        id: `dash-action-${item.id}`,
        title: item.title,
        detail: item.detail,
        priority: item.priority,
        owner: "Strategy Office",
        ageDays: idx + 1,
        source: "Strategy",
      })),
      ...(profiling?.queueItems ?? []).map((item, idx) => ({
        id: `profile-queue-${item.id}`,
        title: item.title,
        detail: item.detail,
        priority: item.priority,
        owner: "Profiling Unit",
        ageDays: idx + 2,
        source: "Psychometric",
      })),
      ...(operations?.alertItems ?? []).map((item, idx) => ({
        id: `ops-alert-${item.id}`,
        title: item.title,
        detail: item.detail,
        priority: item.severity === "critical" ? "high" : item.severity === "warning" ? "medium" : "low",
        owner: "Operations Control",
        ageDays: idx + (item.severity === "critical" ? 4 : 2),
        source: "Operations",
      })),
    ];

    const lane = (ageDays: number) => {
      if (ageDays <= 1) return "today";
      if (ageDays <= 3) return "next48h";
      if (ageDays <= 7) return "thisWeek";
      return "stale";
    };

    return {
      today: items.filter((item) => lane(item.ageDays) === "today"),
      next48h: items.filter((item) => lane(item.ageDays) === "next48h"),
      thisWeek: items.filter((item) => lane(item.ageDays) === "thisWeek"),
      stale: items.filter((item) => lane(item.ageDays) === "stale"),
    };
  }, [dashboard?.actionItems, operations?.alertItems, profiling?.queueItems]);

  const meetingTracker = useMemo(() => {
    const inferred = (dashboard?.latestItems ?? [])
      .filter((item) => /meeting|workshop|event|training|committee|board/i.test(`${item.title} ${item.detail}`))
      .slice(0, 4)
      .map((item) => ({
        id: `mt-${item.id}`,
        title: item.title,
        schedule: formatEventTime(item.createdAt),
        status: item.severity === "critical" ? "attention" : "noted",
        note: item.detail,
      }));

    const defaults = [
      {
        id: "ops-review",
        title: "Morning Operations Review",
        schedule: "Daily 09:00",
        status: "scheduled",
        note: "Exception review across departments, projects, and PO alerts.",
      },
      {
        id: "approval-window",
        title: "Approvals & Escalation Window",
        schedule: "Daily 16:00",
        status: "scheduled",
        note: "Finalize priority approvals and escalation closures.",
      },
      {
        id: "strategy-sync",
        title: "Strategy + Policy Sync",
        schedule: "Weekly Thu 11:30",
        status: "scheduled",
        note: "Track strategy execution and policy updates requiring MD sign-off.",
      },
    ];

    return [...inferred, ...defaults].slice(0, 6);
  }, [dashboard?.latestItems]);

  const operationsTimeline = useMemo(() => {
    const fileUpdates = (dashboard?.latestItems ?? []).slice(0, 6).map((item) => ({
      id: `file-${item.id}`,
      type: "File Update",
      title: item.title,
      detail: item.detail,
      time: item.createdAt,
      severity: item.severity,
    }));

    const opsUpdates = (operations?.alertItems ?? []).slice(0, 4).map((item, idx) => ({
      id: `ops-${item.id}`,
      type: "Operations",
      title: item.title,
      detail: item.detail,
      time: new Date(Date.now() - (idx + 1) * 15 * 60 * 1000).toISOString(),
      severity: item.severity,
    }));

    const queueUpdates = (profiling?.queueItems ?? []).slice(0, 3).map((item, idx) => ({
      id: `queue-${item.id}`,
      type: "Priority Queue",
      title: item.title,
      detail: item.detail,
      time: new Date(Date.now() - (idx + 1) * 22 * 60 * 1000).toISOString(),
      severity: item.priority === "high" ? "critical" : item.priority === "medium" ? "warning" : "info",
    }));

    return [...fileUpdates, ...opsUpdates, ...queueUpdates]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);
  }, [dashboard?.latestItems, operations?.alertItems, profiling?.queueItems]);

  const beneficiaryIntel = useMemo(() => {
    const scopeCard = profiling?.summaryCards.find((item) => /borrowers|scope/i.test(item.title));
    const womenCard = profiling?.summaryCards.find((item) => /women/i.test(item.title));
    const highConfidence = profiling?.poItems.filter((item) => item.confidence === "high").length ?? 0;
    const mediumConfidence = profiling?.poItems.filter((item) => item.confidence === "medium").length ?? 0;
    const lowConfidence = profiling?.poItems.filter((item) => item.confidence === "low").length ?? 0;

    return {
      scope: scopeCard?.value ?? "--",
      womenShare: womenCard?.value ?? "--",
      highConfidence,
      mediumConfidence,
      lowConfidence,
      topRisk: profiling?.queueItems.find((item) => item.priority === "high")?.title ?? "No high-priority beneficiary risk flagged.",
    };
  }, [profiling?.poItems, profiling?.queueItems, profiling?.summaryCards]);

  const microcreditHealth = useMemo(() => {
    const womenBorrowersCoverage = operations?.coverageCards.find((item) => /women borrowers/i.test(item.name));
    const householdCoverage = operations?.coverageCards.find((item) => /household/i.test(item.name));
    const livePo = operations?.poRows.filter((row) => row.status === "live").length ?? 0;
    const watchPo = operations?.poRows.filter((row) => row.status === "watch").length ?? 0;
    const avgPoCoverage =
      operations?.poRows.length
        ? Math.round(
            operations.poRows.reduce((sum, row) => {
              const pct = Number((row.coverage.match(/\d+/)?.[0] ?? "0"));
              return sum + Math.min(100, pct * 12);
            }, 0) / operations.poRows.length,
          )
        : 0;

    return {
      womenBorrowers: womenBorrowersCoverage?.percentage ?? 0,
      householdCoverage: householdCoverage?.percentage ?? 0,
      livePo,
      watchPo,
      avgPoCoverage,
    };
  }, [operations?.coverageCards, operations?.poRows]);

  const strategyPolicyMonitor = useMemo(() => {
    const policyItems = (dashboard?.latestItems ?? []).filter((item) =>
      /policy|strategy|plan|governance|compliance|board|act|framework/i.test(`${item.title} ${item.detail}`),
    );

    const critical = policyItems.filter((item) => item.severity === "critical").length;
    const warning = policyItems.filter((item) => item.severity === "warning").length;

    return {
      critical,
      warning,
      tracked: policyItems.length,
      headline: dashboard?.briefing.headline ?? "Strategy and policy signal not available.",
      nextDecision:
        dashboard?.actionItems.find((item) => item.priority === "high")?.title ??
        "No immediate strategic sign-off required.",
      items: policyItems.slice(0, 4),
    };
  }, [dashboard?.actionItems, dashboard?.briefing.headline, dashboard?.latestItems]);

  const presetDomainStatus = useMemo(() => {
    if (mdPreset === "risk") {
      return mdDomainStatus.filter((item) => ["ops", "po", "beneficiary", "policy"].includes(item.id));
    }
    if (mdPreset === "approvals") {
      return mdDomainStatus.filter((item) => ["approvals", "projects", "meetings"].includes(item.id));
    }
    if (mdPreset === "operations") {
      return mdDomainStatus.filter((item) => ["departments", "ops", "po", "projects"].includes(item.id));
    }
    if (mdPreset === "policy") {
      return mdDomainStatus.filter((item) => ["policy", "projects", "meetings"].includes(item.id));
    }
    return mdDomainStatus;
  }, [mdDomainStatus, mdPreset]);

  const presetUrgentQueue = useMemo(() => {
    if (mdPreset === "risk") {
      return mdUrgentQueue.filter((item) => /risk|alert|critical|warning|climate|mitigation|exception/i.test(`${item.title} ${item.detail}`));
    }
    if (mdPreset === "approvals") {
      return mdUrgentQueue.filter((item) => /approval|queue|decision|sign-off|exception/i.test(`${item.title} ${item.detail}`));
    }
    if (mdPreset === "operations") {
      return mdUrgentQueue.filter((item) => /operations|network|department|field|monitoring/i.test(`${item.title} ${item.detail}`));
    }
    if (mdPreset === "policy") {
      return mdUrgentQueue.filter((item) => /policy|strategy|board|plan|governance|compliance/i.test(`${item.title} ${item.detail}`));
    }
    return mdUrgentQueue;
  }, [mdPreset, mdUrgentQueue]);

  const presetTimeline = useMemo(() => {
    if (mdPreset === "risk") {
      return operationsTimeline.filter((item) => /critical|warning|risk|alert|operations/i.test(`${item.severity} ${item.type} ${item.title}`));
    }
    if (mdPreset === "approvals") {
      return operationsTimeline.filter((item) => /priority queue|operations|file update/i.test(item.type.toLowerCase()));
    }
    if (mdPreset === "operations") {
      return operationsTimeline.filter((item) => /operations|file update/i.test(item.type.toLowerCase()));
    }
    if (mdPreset === "policy") {
      return operationsTimeline.filter((item) => /file update/i.test(item.type.toLowerCase()) || /policy|strategy|plan/i.test(`${item.title} ${item.detail}`));
    }
    return operationsTimeline;
  }, [mdPreset, operationsTimeline]);

  const scenarioOutlook = useMemo(() => {
    const pressure = mdHealth.criticalCount * 2 + mdHealth.highPriorityQueue * 1.5;
    const warningSignals = strategyPolicyMonitor.warning + strategyPolicyMonitor.critical * 2;

    const project = (days: number) => {
      const decay = Math.round((pressure + warningSignals) * (days / 30) * 0.8);
      const score = Math.max(0, Math.min(100, mdHealth.score - decay));
      const status: "live" | "stable" | "watch" = score >= 80 ? "live" : score >= 60 ? "stable" : "watch";
      const guidance =
        status === "live"
          ? "System remains healthy with current intervention pace."
          : status === "stable"
            ? "Needs tighter execution control and faster closure of priority items."
            : "Immediate executive intervention required on risk and approval backlogs.";
      return { score, status, guidance };
    };

    return {
      d30: project(30),
      d60: project(60),
      d90: project(90),
    };
  }, [mdHealth.criticalCount, mdHealth.highPriorityQueue, mdHealth.score, strategyPolicyMonitor.critical, strategyPolicyMonitor.warning]);

  const handleExportBoardBrief = useCallback(() => {
    const lines = [
      "PKSF MD BOARD BRIEF",
      `Generated: ${new Date().toISOString()}`,
      `Preset: ${mdPreset.toUpperCase()}`,
      "",
      `Enterprise Health Index: ${mdHealth.score} (${mdHealth.status.toUpperCase()})`,
      `Critical Signals: ${mdHealth.criticalCount}`,
      `High Priority Queue: ${mdHealth.highPriorityQueue}`,
      "",
      "Top Domain Status:",
      ...presetDomainStatus.slice(0, 6).map((item) => `- ${item.label}: ${item.status.toUpperCase()} | ${item.detail}`),
      "",
      "Urgent Exceptions:",
      ...(presetUrgentQueue.length ? presetUrgentQueue.slice(0, 6).map((item) => `- ${item.title}: ${item.detail}`) : ["- None"]),
      "",
      "30/60/90 Outlook:",
      `- 30 days: ${scenarioOutlook.d30.score} (${scenarioOutlook.d30.status.toUpperCase()})`,
      `- 60 days: ${scenarioOutlook.d60.score} (${scenarioOutlook.d60.status.toUpperCase()})`,
      `- 90 days: ${scenarioOutlook.d90.score} (${scenarioOutlook.d90.status.toUpperCase()})`,
      "",
      `Next MD Decision: ${strategyPolicyMonitor.nextDecision}`,
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `pksf-md-brief-${stamp}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [mdHealth.criticalCount, mdHealth.highPriorityQueue, mdHealth.score, mdHealth.status, mdPreset, presetDomainStatus, presetUrgentQueue, scenarioOutlook.d30.score, scenarioOutlook.d30.status, scenarioOutlook.d60.score, scenarioOutlook.d60.status, scenarioOutlook.d90.score, scenarioOutlook.d90.status, strategyPolicyMonitor.nextDecision]);

  const handleRefreshDashboard = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await loadDashboard();
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, loadDashboard]);

    if (!checked) {
      return <DashboardLoader message="Checking your session before loading the live PKSF knowledge index." />;
    }

    if (!authed) return null;

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--bg-0)",
      }}
    >
      <TopBar onMenuToggle={() => setMobileLeftOpen((o) => !o)} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftPanel mobileOpen={mobileLeftOpen} onMobileClose={() => setMobileLeftOpen(false)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {loading && !dashboard && !error && (
            <GlassCard className="mb-4">
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "#06b6d4",
                    boxShadow: "0 0 12px rgba(6,182,212,0.35)",
                    animation: "pulse-green 1.2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  Fetching live dashboard content from `pksf_knowledge`...
                </p>
              </div>
            </GlassCard>
          )}

          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <span
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "9px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Executive Overview
                </span>
              </div>
              <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700 }}>
                PKSF Intelligence Dashboard
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "2px", maxWidth: "860px" }}>
                {dashboard?.subtitle ?? "Loading real knowledge content from pksf_knowledge..."}
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", width: "100%" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    minWidth: "130px",
                    padding: "7px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--text-secondary)",
                    fontSize: "11px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontVariantNumeric: "tabular-nums",
                    flexShrink: 0,
                  }}
                >
                  <Clock3 size={12} />
                  {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
                <ControlButton
                  active={liveMode}
                  onClick={() => setLiveMode((current) => !current)}
                  label={liveMode ? "Live Auto Refresh On" : "Live Auto Refresh Off"}
                />
                <button
                  onClick={() => void handleRefreshDashboard()}
                  disabled={isRefreshing}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--text-secondary)",
                    padding: "8px 10px",
                    cursor: isRefreshing ? "default" : "pointer",
                    opacity: isRefreshing ? 0.7 : 1,
                  }}
                >
                  <RefreshCcw size={13} />
                  {isRefreshing ? "Refreshing..." : "Refresh Now"}
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginLeft: "auto", flexShrink: 0 }}>
                <button
                  onClick={handleExportBoardBrief}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "999px",
                    border: "1px solid rgba(167,139,250,0.22)",
                    background: "rgba(167,139,250,0.12)",
                    color: "#a78bfa",
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  <FileDown size={13} />
                  Export Board Brief
                </button>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>View</span>
                  <ControlButton active={mdPreset === "board"} onClick={() => setMdPreset("board")} label="Board" />
                  <ControlButton active={mdPreset === "risk"} onClick={() => setMdPreset("risk")} label="Risk" />
                  <ControlButton active={mdPreset === "approvals"} onClick={() => setMdPreset("approvals")} label="Approvals" />
                  <ControlButton active={mdPreset === "operations"} onClick={() => setMdPreset("operations")} label="Operations" />
                  <ControlButton active={mdPreset === "policy"} onClick={() => setMdPreset("policy")} label="Policy" />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <GlassCard className="mb-4">
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div>
                  <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: 700, marginBottom: "2px" }}>
                    Dashboard Load Error
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>{error}</p>
                </div>
                <button
                  onClick={() => void handleRefreshDashboard()}
                  disabled={isRefreshing}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--text-secondary)",
                    padding: "8px 10px",
                    cursor: isRefreshing ? "default" : "pointer",
                    opacity: isRefreshing ? 0.7 : 1,
                    flexShrink: 0,
                  }}
                >
                  <RefreshCcw size={13} />
                  {isRefreshing ? "Retrying..." : "Retry"}
                </button>
              </div>
            </GlassCard>
          )}

          {dashboard && (
            <GlassCard className="mb-4">
              <div
                style={{
                  padding: "16px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <Sparkles size={14} color="#06b6d4" />
                    <span style={{ color: "#06b6d4", fontSize: "11px", fontWeight: 700, letterSpacing: "0.4px" }}>
                      MD BRIEFING
                    </span>
                  </div>
                  <h2 style={{ color: "var(--text-primary)", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
                    {dashboard.briefing.headline}
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.6 }}>
                    {dashboard.briefing.summary}
                  </p>
                </div>

                <div
                  style={{
                    padding: "12px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <Activity size={14} color="#a78bfa" />
                    <span style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 700 }}>ACTION QUEUE</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {dashboard.actionItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          background: `${priorityColors[item.priority]}0d`,
                          border: `1px solid ${priorityColors[item.priority]}22`,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                          <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                          <span style={{ color: priorityColors[item.priority], fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                            {item.priority}
                          </span>
                        </div>
                        <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          <GlassCard className="mb-4">
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                <div>
                  <p style={{ color: "#06b6d4", fontSize: "11px", fontWeight: 700, letterSpacing: "0.4px", marginBottom: "4px" }}>
                    MD COMMAND CENTER
                  </p>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>
                    Live Enterprise Health
                  </h3>
                  <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                    Unified signal across operations, strategy, PO network, and psychometric readiness.
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: mdHealth.status === "live" ? "#10b981" : mdHealth.status === "stable" ? "#06b6d4" : "#ef4444", fontSize: "30px", fontWeight: 700, lineHeight: 1 }}>
                    {mdHealth.score}
                  </div>
                  <div style={{ color: "var(--text-dim)", fontSize: "10px" }}>PKSF Health Index</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "10px", marginTop: "3px" }}>
                    {mdHealth.criticalCount} critical signals | {mdHealth.highPriorityQueue} high-priority queue
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "12px", height: "6px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${mdHealth.score}%`,
                    background: mdHealth.status === "live" ? "#10b981" : mdHealth.status === "stable" ? "#06b6d4" : "#ef4444",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "12px" }}>
                <div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "8px" }}>Domain Status Matrix</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "8px" }}>
                    {presetDomainStatus.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div key={item.id} style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "5px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <IconComp size={13} color="#a78bfa" />
                              <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.label}</p>
                            </div>
                            <StatusBadge status={item.status} />
                          </div>
                          <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "8px" }}>Urgent Exceptions</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {presetUrgentQueue.length === 0 ? (
                      <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", color: "var(--text-dim)", fontSize: "12px" }}>
                        No urgent exceptions at this time.
                      </div>
                    ) : (
                      presetUrgentQueue.map((item) => (
                        <div key={item.id} style={{ padding: "10px", borderRadius: "10px", background: item.severity === "critical" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)", border: item.severity === "critical" ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(245,158,11,0.2)" }}>
                          <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{item.title}</p>
                          <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="mb-4">
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
                <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                  30/60/90 Day Scenario Outlook
                </h3>
                <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>
                  Preset: {mdPreset.toUpperCase()}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(180px, 1fr))", gap: "10px" }}>
                {([
                  ["30 Days", scenarioOutlook.d30],
                  ["60 Days", scenarioOutlook.d60],
                  ["90 Days", scenarioOutlook.d90],
                ] as const).map(([label, outlook]) => (
                  <div key={label} style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", gap: "8px" }}>
                      <p style={{ color: "var(--text-secondary)", fontSize: "11px", fontWeight: 700 }}>{label}</p>
                      <span style={{ color: outlook.status === "live" ? "#10b981" : outlook.status === "stable" ? "#06b6d4" : "#ef4444", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>
                        {outlook.status}
                      </span>
                    </div>
                    <p style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>{outlook.score}</p>
                    <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{outlook.guidance}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "12px", marginBottom: "12px" }}>
            <GlassCard>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <ClipboardCheck size={14} color="#a78bfa" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Approvals Aging Board
                  </h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(140px, 1fr))", gap: "8px" }}>
                  {([
                    ["Today", approvalsBoard.today],
                    ["48 Hours", approvalsBoard.next48h],
                    ["This Week", approvalsBoard.thisWeek],
                    ["Aging", approvalsBoard.stale],
                  ] as const).map(([laneLabel, laneItems]) => (
                    <div key={laneLabel} style={{ padding: "8px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ color: "#06b6d4", fontSize: "10px", fontWeight: 700, marginBottom: "6px", letterSpacing: "0.3px" }}>
                        {laneLabel}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {laneItems.length === 0 ? (
                          <p style={{ color: "var(--text-dim)", fontSize: "10px" }}>No items</p>
                        ) : (
                          laneItems.slice(0, 3).map((item) => (
                            <div key={item.id} style={{ padding: "7px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                              <p style={{ color: "var(--text-secondary)", fontSize: "11px", fontWeight: 700, lineHeight: 1.35 }}>{item.title}</p>
                              <p style={{ color: "var(--text-dim)", fontSize: "9px", marginTop: "3px" }}>
                                {item.owner} | {item.source} | {item.ageDays}d
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <CalendarClock size={14} color="#06b6d4" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Meeting Tracker
                  </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {meetingTracker.map((item) => (
                    <div key={item.id} style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                        <span style={{ color: item.status === "attention" ? "#ef4444" : "#10b981", fontSize: "9px", fontWeight: 700, textTransform: "uppercase" }}>
                          {item.status}
                        </span>
                      </div>
                      <p style={{ color: "#a78bfa", fontSize: "10px", marginBottom: "4px" }}>{item.schedule}</p>
                      <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="mb-4">
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <Activity size={14} color="#10b981" />
                <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                  Daily Operations Timeline
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {presetTimeline.map((item) => (
                  <div key={item.id} style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "10px" }}>
                    <div style={{ width: "8px", borderRadius: "999px", background: item.severity === "critical" ? "#ef4444" : item.severity === "warning" ? "#f59e0b" : "#06b6d4", flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                        <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>{formatEventTime(item.time)}</span>
                      </div>
                      <p style={{ color: "#a78bfa", fontSize: "10px", marginBottom: "4px" }}>{item.type}</p>
                      <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
                {!loading && presetTimeline.length === 0 && (
                  <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", color: "var(--text-dim)", fontSize: "12px" }}>
                    No timeline entries match the current preset.
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(260px, 1fr))", gap: "12px", marginBottom: "12px" }}>
            <GlassCard>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Users2 size={14} color="#06b6d4" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Beneficiary Intelligence
                  </h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ color: "var(--text-dim)", fontSize: "10px" }}>Borrower Scope</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700 }}>{beneficiaryIntel.scope}</p>
                  </div>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ color: "var(--text-dim)", fontSize: "10px" }}>Women Share</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700 }}>{beneficiaryIntel.womenShare}</p>
                  </div>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <p style={{ color: "var(--text-dim)", fontSize: "10px", marginBottom: "4px" }}>Confidence Cohorts</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "11px", lineHeight: 1.45 }}>
                    High: {beneficiaryIntel.highConfidence} | Medium: {beneficiaryIntel.mediumConfidence} | Low: {beneficiaryIntel.lowConfidence}
                  </p>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>
                  Top beneficiary-related risk: {beneficiaryIntel.topRisk}
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrendingUp size={14} color="#10b981" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Microcredit Health Cockpit
                  </h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ color: "var(--text-dim)", fontSize: "10px" }}>Women Borrower Coverage</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700 }}>{microcreditHealth.womenBorrowers}%</p>
                  </div>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ color: "var(--text-dim)", fontSize: "10px" }}>Household Coverage</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700 }}>{microcreditHealth.householdCoverage}%</p>
                  </div>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <p style={{ color: "var(--text-dim)", fontSize: "10px", marginBottom: "4px" }}>PO Network Status</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "11px", lineHeight: 1.45 }}>
                    Live: {microcreditHealth.livePo} | Watch: {microcreditHealth.watchPo}
                  </p>
                </div>
                <div>
                  <p style={{ color: "var(--text-dim)", fontSize: "10px", marginBottom: "4px" }}>Average PO Coverage Signal</p>
                  <div style={{ height: "5px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "3px" }}>
                    <div style={{ height: "100%", width: `${microcreditHealth.avgPoCoverage}%`, background: "#10b981" }} />
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "10px" }}>{microcreditHealth.avgPoCoverage}%</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <FileText size={14} color="#a78bfa" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Strategy & Policy Monitor
                  </h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "6px", marginBottom: "10px" }}>
                  <div style={{ padding: "7px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", textAlign: "center" }}>
                    <p style={{ color: "#ef4444", fontSize: "9px", fontWeight: 700 }}>CRITICAL</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700 }}>{strategyPolicyMonitor.critical}</p>
                  </div>
                  <div style={{ padding: "7px", borderRadius: "8px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", textAlign: "center" }}>
                    <p style={{ color: "#f59e0b", fontSize: "9px", fontWeight: 700 }}>WARNING</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700 }}>{strategyPolicyMonitor.warning}</p>
                  </div>
                  <div style={{ padding: "7px", borderRadius: "8px", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", textAlign: "center" }}>
                    <p style={{ color: "#06b6d4", fontSize: "9px", fontWeight: 700 }}>TRACKED</p>
                    <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700 }}>{strategyPolicyMonitor.tracked}</p>
                  </div>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45, marginBottom: "8px" }}>
                  {strategyPolicyMonitor.headline}
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>
                  Next MD Decision
                </p>
                <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45, marginBottom: "8px" }}>
                  {strategyPolicyMonitor.nextDecision}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {strategyPolicyMonitor.items.map((item) => (
                    <p key={item.id} style={{ color: "var(--text-dim)", fontSize: "10px", lineHeight: 1.4 }}>
                      - {item.title}
                    </p>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {kpis.map((metric) => {
              const iconConfig = KPI_ICON_CONFIG[metric.id] ?? KPI_ICON_CONFIG["knowledge-chunks"];
              return (
                <KPICard
                  key={metric.id}
                  {...metric}
                  icon={iconConfig.icon}
                  iconColor={iconConfig.iconColor}
                  iconBg={iconConfig.iconBg}
                />
              );
            })}
          </div>

          {executiveCards.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {executiveCards.map((card) => (
                <GlassCard key={card.id}>
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                      <div>
                        <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "4px" }}>{card.title}</p>
                        <h3 style={{ color: "var(--text-primary)", fontSize: "24px", fontWeight: 700 }}>{card.value}</h3>
                      </div>
                      <StatusBadge status={card.status} />
                    </div>
                    <p style={{ color: "var(--text-dim)", fontSize: "12px", lineHeight: 1.45 }}>{card.detail}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {dashboard?.readiness && dashboard.readiness.length > 0 && (
            <GlassCard className="mb-4">
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <Activity size={14} color="#06b6d4" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Data Readiness
                  </h3>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {dashboard.readiness.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                        <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700 }}>{item.title}</p>
                        <StatusBadge status={item.status} />
                      </div>
                      <p style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr minmax(300px, 360px)",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <GlassCard>
              <div style={{ padding: "16px 16px 8px" }}>
                <div style={{ marginBottom: "14px" }}>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                    Knowledge Base Distribution
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    Unique document share by PKSF source group
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={distribution} barCategoryGap="35%">
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6a6a90", fontSize: 10, fontFamily: "JetBrains Mono" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6a6a90", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {distribution.map((entry, index) => (
                        <Cell key={`${entry.name}-${index}`} fill={entry.color} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                {!loading && distribution.length === 0 && (
                  <p style={{ color: "var(--text-dim)", fontSize: "12px", marginTop: "10px" }}>
                    No distribution data available.
                  </p>
                )}
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Latest Ingested Items
                  </h3>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {(["all", "critical", "warning", "info"] as const).map((filter) => (
                      <ControlButton
                        key={filter}
                        active={latestFilter === filter}
                        onClick={() => setLatestFilter(filter)}
                        label={filter === "all" ? "All" : filter[0].toUpperCase() + filter.slice(1)}
                      />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {loading && latestItems.length === 0 ? (
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--text-dim)",
                        fontSize: "12px",
                      }}
                    >
                      Loading latest items from the knowledge table...
                    </div>
                  ) : filteredLatestItems.length === 0 ? (
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--text-dim)",
                        fontSize: "12px",
                      }}
                    >
                      No items match the current alert filter.
                    </div>
                  ) : (
                    filteredLatestItems.map((item) => {
                      const IconComp = alertIcons[item.severity];
                      const color = alertColors[item.severity];

                      return (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            gap: "8px",
                            padding: "8px",
                            borderRadius: "8px",
                            background: `${color}08`,
                            border: `1px solid ${color}18`,
                          }}
                        >
                          <IconComp size={13} color={color} strokeWidth={2} style={{ marginTop: "1px", flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <p
                              style={{
                                color: "var(--text-secondary)",
                                fontSize: "13px",
                                fontWeight: 600,
                                marginBottom: "2px",
                              }}
                            >
                              {item.title}
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.4 }}>
                              {item.detail}
                            </p>
                            <span
                              style={{
                                color: "var(--text-dim)",
                                fontSize: "9px",
                                fontFamily: "var(--font-jetbrains-mono), monospace",
                              }}
                            >
                              {item.time}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(320px, 0.95fr) minmax(360px, 1.05fr)",
              gap: "12px",
            }}
          >
            <GlassCard>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  <h3 style={{ color: "var(--text-primary)", fontSize: "13px", fontWeight: 600 }}>
                    Executive Drill-Down
                  </h3>
                </div>
                {selectedFeatured ? (
                  <>
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "10px",
                        background: "rgba(6,182,212,0.06)",
                        border: "1px solid rgba(6,182,212,0.16)",
                      }}
                    >
                      <p style={{ color: "#06b6d4", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>
                        What this section does
                      </p>
                      <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.5 }}>
                        This panel explains why the selected knowledge item matters for leadership decisions, summarizes its coverage, and lets you jump directly to the source.
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                      <div>
                        <p style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: 700, lineHeight: 1.35 }}>
                          {selectedFeatured.title}
                        </p>
                        <p style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                          {selectedFeatured.source}
                        </p>
                      </div>
                      <StatusBadge status={selectedFeatured.status} label={selectedFeatured.badgeLabel} />
                    </div>

                    <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                      {selectedFeatured.progressLabel}
                    </p>

                    <div style={{ marginBottom: "8px" }}>
                      <div
                        style={{
                          height: "5px",
                          borderRadius: "3px",
                          background: "rgba(255,255,255,0.06)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${selectedFeatured.progressPct}%`,
                            borderRadius: "3px",
                            background:
                              selectedFeatured.progressPct >= 100
                                ? "#10b981"
                                : selectedFeatured.progressPct >= 70
                                  ? "#06b6d4"
                                  : "#f59e0b",
                          }}
                        />
                      </div>
                    </div>

                    <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.6, marginBottom: "12px" }}>
                      {selectedFeatured.snippet}
                    </p>

                    <div
                      style={{
                        marginBottom: "12px",
                        padding: "10px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                        Executive Summary
                      </p>
                      <p style={{ color: "var(--text-dim)", fontSize: "12px", lineHeight: 1.5 }}>{featuredExecutiveSummary}</p>
                    </div>

                    <div
                      style={{
                        marginBottom: "12px",
                        padding: "10px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "8px" }}>
                        Visual Signal Summary
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div>

                        <div
                          style={{
                            marginBottom: "12px",
                            padding: "10px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                            Key Takeaways
                          </p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            {featuredTakeaways.map((item, idx) => (
                              <p key={idx} style={{ color: "var(--text-dim)", fontSize: "11px", lineHeight: 1.45 }}>
                                {idx + 1}. {item}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                          <a
                            href={selectedFeatured.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "7px 10px",
                              borderRadius: "999px",
                              border: "1px solid rgba(6,182,212,0.24)",
                              color: "#06b6d4",
                              fontSize: "11px",
                              fontWeight: 700,
                              textDecoration: "none",
                              background: "rgba(6,182,212,0.08)",
                            }}
                          >
                            Open Source Item
                          </a>
                          <a
                            href={`/chat?q=${encodeURIComponent(selectedFeatured.title)}`}
                            style={{
                              padding: "7px 10px",
                              borderRadius: "999px",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "var(--text-secondary)",
                              fontSize: "11px",
                              fontWeight: 700,
                              textDecoration: "none",
                              background: "rgba(255,255,255,0.03)",
                            }}
                          >
                            Explore In Knowledge Chat
                          </a>
                        </div>

                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>Index Coverage</span>
                            <span style={{ color: "#a78bfa", fontSize: "10px", fontWeight: 700 }}>{selectedFeatured.progressPct}%</span>
                          </div>
                          <div style={{ height: "5px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${selectedFeatured.progressPct}%`, background: "#10b981" }} />
                          </div>
                        </div>

                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>MD Relevance</span>
                            <span style={{ color: "#06b6d4", fontSize: "10px", fontWeight: 700 }}>
                              {selectedFeatured.status === "live" ? "High" : selectedFeatured.status === "stable" ? "Medium" : "Watch"}
                            </span>
                          </div>
                          <div style={{ height: "5px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div
                              style={{
                                height: "100%",
                                width: `${selectedFeatured.status === "live" ? 88 : selectedFeatured.status === "stable" ? 62 : 38}%`,
                                background: selectedFeatured.status === "live" ? "#06b6d4" : selectedFeatured.status === "stable" ? "#f59e0b" : "#ef4444",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <p style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                        Why this matters for the MD
                      </p>
                      <p style={{ color: "var(--text-dim)", fontSize: "12px", lineHeight: 1.5 }}>
                        This source is currently selected as a boardroom talking point. Use it to explain current momentum, evidence depth, and the strategic context behind live decisions.
                      </p>
                    </div>
                  </>
                ) : (
                  <p style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                    No featured item is available for drill-down.
                  </p>
                )}
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ padding: "16px" }}>
                <h3
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "14px",
                  }}
                >
                  Featured Knowledge Items
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {loading && featuredItems.length === 0 ? (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        padding: "12px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--text-dim)",
                        fontSize: "12px",
                      }}
                    >
                      Loading featured items from `pksf_knowledge`...
                    </div>
                  ) : featuredItems.length === 0 ? (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        padding: "12px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--text-dim)",
                        fontSize: "12px",
                      }}
                    >
                      No featured documents found in the current knowledge index.
                    </div>
                  ) : (
                    featuredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedFeaturedId(item.id)}
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          borderRadius: "10px",
                          background: item.id === selectedFeatured?.id ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.02)",
                          border: item.id === selectedFeatured?.id ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(255,255,255,0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "8px" }}>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: 700, lineHeight: 1.35 }}>
                              {item.title}
                            </p>
                            <p style={{ color: "var(--text-dim)", fontSize: "9px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                              {item.source}
                            </p>
                          </div>
                          <StatusBadge status={item.status} label={item.badgeLabel} />
                        </div>
                        <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                          {item.progressLabel}
                        </p>
                        <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.5 }}>
                          {item.snippet}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  );
}
