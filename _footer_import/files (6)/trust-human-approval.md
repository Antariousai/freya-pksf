# Human Approval
### Trust · Antarious AI

---

## Page Header

**Section Label:** Trust Architecture  
**Page Title:** Human Approval  
**Tagline:** Every action Freya takes requires a designated human to authorise it. Not as a safeguard. As a structural requirement.  
**Supporting Statement:** Antarious AI is built on a single non-negotiable principle: artificial intelligence executes. Humans decide. No external action — no communication sent, no workflow triggered, no document published, no data submitted — is initiated without explicit sign-off from an authorised person in your organisation.

---

## Section 01 — The Principle

### Why Human Approval Is Structural, Not Optional

Most AI systems describe human oversight as a feature. In Antarious, it is an architectural constraint — baked into every agent, every workflow, and every output that Freya produces.

Freya is designed to do two things exceptionally well: prepare, and present. She monitors your operations, synthesises your data, drafts your documents, and surfaces your decisions — with full context, cited sources, and a clear recommendation. But she does not act on any of it until a designated human says so.

This is not a limitation of the technology. It is a deliberate design position, rooted in three convictions:

1. **Accountability cannot be delegated to software.** In enterprise, government, and development contexts, decisions carry consequences — legal, financial, reputational, and human. Accountability must remain with the people whose names, roles, and judgement are behind every outcome.

2. **Context that AI cannot access always exists.** Freya has access to your data. She does not have access to your relationships, your political environment, your cultural context, or your ethical judgement. Humans do. Approval is the point where that knowledge enters every decision.

3. **Trust requires verifiability.** Stakeholders — donors, regulators, ministers, boards, clients — need to know that a human was responsible for every significant action. The approval record is that proof.

---

## Section 02 — How It Works

### The Approval Architecture

Every workflow in Antarious is built around an **Approve Before Execute** model. Freya completes her preparation — analysis, drafting, enrichment, synthesis — and then halts. Execution does not resume until an authorised approver acts.

#### The Four-Stage Approval Flow

```
STAGE 1 — FREYA PREPARES
Freya completes the task: draft, analysis, outreach sequence,
report, alert, or action recommendation. Full context assembled.

STAGE 2 — REVIEW PACKAGE DELIVERED
Approver receives a structured review package containing:
  · The proposed action or output
  · The data sources and reasoning behind it
  · Any flagged risks or anomalies
  · Recommended next steps
  · Approval options

STAGE 3 — HUMAN DECISION POINT
The designated approver reviews and chooses:
  · Approve — Freya executes exactly as prepared
  · Approve with edits — Approver modifies, Freya executes the revised version
  · Request revision — Freya re-drafts with new instructions
  · Reject — Action is cancelled and logged with reason

STAGE 4 — EXECUTION + AUDIT RECORD
If approved, Freya executes. The approval decision, approver identity,
timestamp, and any edits are permanently recorded in the audit trail.
```

---

## Section 03 — Scope of Approval Requirements

### What Requires Human Approval

The following categories of action require explicit human authorisation before Freya proceeds. This list reflects defaults; organisations may expand approval requirements through configuration.

| Action Category | Examples | Default Approver Level |
|---|---|---|
| **External Communications** | Emails sent, messages delivered, press releases published, citizen-facing updates | Designated officer / team lead |
| **Document Publication** | Donor reports submitted, board papers circulated, policy briefs shared | Senior officer / director |
| **Data Submission** | Form submissions to external systems, API pushes to partner platforms | Operations lead |
| **Financial Actions** | Budget reallocation recommendations acted upon, procurement triggers | Finance authority |
| **Campaign Execution** | Ad campaigns activated, outreach sequences launched, content published | Marketing lead |
| **Compliance Filings** | Regulatory submissions, audit evidence submitted, disclosure documents | Compliance officer |
| **Escalations** | Risk alerts escalated to leadership, corrective memos sent to partners | Designated escalation officer |
| **System Changes** | New integrations activated, workflow configurations updated | System administrator |

### What Freya Does Without Approval

The following internal operations run autonomously by design — they are monitoring, preparation, and intelligence functions that carry no external consequence and require no approval:

- Continuous data ingestion and processing from connected sources
- Internal dashboard updates and KPI calculations
- Draft preparation and document generation (prior to review)
- Anomaly detection and internal alert generation
- Institutional memory updates and context retention
- Scheduled report drafting (delivered for review, not published)

---

## Section 04 — Configuring Approval Workflows

### Approval Is Configurable to Your Governance Structure

Antarious does not impose a single approval model. Every deployment is configured to reflect the authority structures, escalation paths, and governance requirements of your organisation.

#### Configuration Options

**Single-approver workflows**  
One designated person reviews and approves. Suitable for lower-stakes actions or organisations with streamlined governance.

**Sequential multi-approver workflows**  
Approval passes through a defined chain — for example, team lead → department head → director — before execution. Each approver sees the previous approver's comments and decision.

**Parallel approval workflows**  
Multiple approvers review simultaneously. Execution triggers when a quorum or unanimous agreement is reached. Suitable for actions requiring cross-functional sign-off.

**Conditional approval routing**  
Approval routing is determined by the nature of the action. A social media post routes to the Communications Lead; a budget reallocation routes to the Finance Director. Rules are configured at deployment and can be updated at any time.

**Delegated approval**  
Approvers can delegate authority to a named deputy for a defined period — for example, during leave — without removing the approval requirement from the workflow.

**Approval thresholds**  
Certain actions may require escalation based on scale. For example: campaign spends below £5,000 require team lead approval; above £5,000 require director approval. Thresholds are configurable.

---

## Section 05 — The Approval Interface

### How Approvers Experience the Review Process

Approvals are delivered to designated approvers through their configured channels — this may include the Antarious platform, email notification, or integrated communication tools such as Slack or Microsoft Teams.

Each approval request contains:

**1. Action Summary**  
A plain-language description of what Freya is proposing to do and why.

**2. Supporting Context**  
The data, analysis, or reasoning that informed the recommendation. Sources are cited. Assumptions are stated.

**3. Proposed Output**  
The exact content that will be executed — the email text, the report draft, the outreach sequence, the compliance filing — presented for review before anything is sent.

**4. Risk Flags**  
Any anomalies, conflicts, or uncertainties Freya has detected that the approver should be aware of before deciding.

**5. Decision Options**  
Approve / Approve with edits / Request revision / Reject — with a free-text field for instructions or reasoning.

**6. Deadline Indicator**  
Where the action is time-sensitive, the approver is shown the window within which a decision is needed and what will happen if no decision is made (default: action is held, not auto-executed).

---

## Section 06 — What Happens Without Approval

### Non-Approval Handling

Antarious is designed to hold, not auto-execute, in the absence of a human decision.

- **No response from approver:** The action remains in a pending state. Freya sends a reminder after a configurable interval (default: 24 hours). If a deadline is critical, Freya escalates to a secondary approver if one is configured.
- **Rejection:** The action is cancelled. The rejection reason is logged. Freya does not retry unless instructed to re-draft and re-submit.
- **Approver unavailable:** If delegation is configured, approval routes to the delegated deputy. If not, the action holds until the approver is available or an administrator manually reassigns.
- **System failure during approval:** If a technical failure interrupts the approval process, the action does not proceed. The system logs the failure and notifies administrators.

**Under no circumstances does Freya self-approve an action or proceed on the assumption of approval.**

---

## Section 07 — Accountability Records

### Every Approval Is Permanently Recorded

The approval record for every action is stored permanently in the audit trail and contains:

- **Who approved** — Full name, role, and user ID of the approver
- **When they approved** — Timestamp to the second (UTC)
- **What they approved** — The exact version of the output or action at the point of approval
- **Any edits made** — A tracked diff of changes made by the approver before authorising
- **Their stated reasoning** — Any commentary or instructions entered during review
- **The outcome** — Whether the action was executed, revised, or rejected

This record cannot be altered or deleted after the fact. It is available for internal review, external audit, regulatory inspection, or legal disclosure at any time.

---

## Section 08 — Compliance & Regulatory Relevance

### Human Approval as a Compliance Mechanism

For organisations operating in regulated environments, the Antarious human approval architecture provides direct support for compliance obligations across multiple frameworks.

| Regulatory / Framework Context | How Human Approval Supports Compliance |
|---|---|
| **UK GDPR / EU GDPR** | Human review of any automated decision with legal or significant effect on individuals — Article 22 compliant by design |
| **ISO 27001** | Documented access control and change management processes supported by approval workflows |
| **Public Finance regulations** | Full approval chain for any action with financial consequence; audit evidence auto-compiled |
| **Donor compliance (World Bank, USAID, DFID)** | Human authorisation of all external submissions and communications; approval chain available for review missions |
| **Government accountability frameworks** | Named officer accountable for every approved action; full ministerial/directorate audit trail available |
| **AI Act (EU) — High Risk AI Systems** | Human oversight provisions met through mandatory approval gate on all consequential outputs |

> **Note:** Antarious does not provide legal advice. Organisations should confirm compliance mapping with their own legal and compliance counsel. The above reflects how the human approval architecture is designed to support — not substitute for — compliance obligations.

---

## Section 09 — Frequently Asked Questions

**Q: Can approval be turned off for certain workflows to increase speed?**  
A: Approval requirements for external actions cannot be disabled — this is a platform-level constraint. However, approval workflows can be streamlined: single-click approval for lower-risk actions, pre-approved template libraries, and delegated authority all reduce friction without removing the human decision point.

**Q: What if our organisation needs approvals from multiple people in different locations or time zones?**  
A: Antarious supports asynchronous approval workflows. Approvers receive notifications through configured channels and can act from any location. Parallel and sequential workflows can be combined to accommodate distributed teams.

**Q: How long does an approval typically take?**  
A: Freya prepares review packages that are designed to be actioned in under five minutes for routine approvals. The review package surfaces everything the approver needs to decide — no additional research is required from the approver.

**Q: Who configures approval workflows?**  
A: Approval workflow configuration is completed during deployment by Antarious's implementation team, in consultation with your governance and operations leads. Workflows can be updated post-deployment by designated system administrators.

**Q: Is there a mobile interface for approvals?**  
A: Yes. Approvers can review and action approval requests from any device. Email-based approval is also supported for organisations where platform access is not always available.

**Q: What happens if the approver approves something incorrectly?**  
A: The audit trail records the approval with full context. Freya cannot retroactively undo an approved action, but the record of what was approved, by whom, and on what basis is permanently available. Post-approval rollback procedures depend on the action type and are configured during deployment.

---

## Section 10 — Related Trust Pages

- [Audit Trail →](#) — How every approval and action is permanently logged
- [Role-Based Control →](#) — How approval authority is assigned and bounded by role
- [Security →](#) — How approval data is protected and access is controlled

---

## CTA Block

**Heading:** See human approval in action.  
**Body:** Every Freya deployment is configured to your governance structure. Request a briefing to walk through how approval workflows are built for your organisation.  
**Primary CTA:** Request a Demo →  
**Secondary CTA:** Download Trust Overview →

---

*Antarious AI · Trust Architecture · Human Approval*  
*Last reviewed: April 2026*
