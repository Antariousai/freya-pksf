# Role-Based Control
### Trust · Antarious AI

---

## Page Header

**Section Label:** Trust Architecture  
**Page Title:** Role-Based Control  
**Tagline:** Freya's capabilities are powerful. Who can direct them, approve them, and see them is governed with precision — by role, by function, and by the governance structure of your organisation.  
**Supporting Statement:** Antarious does not give everyone access to everything. Authority over AI-driven workflows is structured, bounded, and verifiable — reflecting the accountability hierarchies that exist in your organisation and adding a new layer of governance rigour to every process Freya touches.

---

## Section 01 — The Governance Problem Antarious Solves

### Why Access Control in AI Systems Is Different

In conventional software, access control manages who can view data and who can modify it. In an AI operating system, access control must answer a harder set of questions.

Who can instruct Freya to initiate a workflow? Who can approve the actions she prepares? Who can see the data she's analysing? Who can modify the boundaries she operates within? Who can escalate decisions upward — and to whom? Who is accountable when something goes wrong?

These questions do not have simple answers in most organisations. They reflect real authority structures, delegation arrangements, departmental boundaries, and governance requirements that vary by role, by function, and by the nature of the action being taken.

Antarious role-based control is designed to encode those structures into the platform — so that the governance that exists in your organisation is also the governance that exists in your AI operations. Not approximated. Reflected with precision.

---

## Section 02 — The Role Architecture

### Four Foundational Role Layers

Every Antarious deployment is built around four foundational role layers. Within each layer, roles are customised to reflect the specific structures of your organisation.

---

#### Layer 1 — System Administration
**Who this is:** Technical administrators responsible for the configuration and security of the Antarious deployment.  
**What they can do:**
- Configure user roles and permission sets
- Manage integrations and data connections
- Set system-wide parameters and agent configurations
- Access audit trails for system administration purposes
- Manage user accounts, access grants, and revocations

**What they cannot do:**
- Approve operational actions on behalf of designated approvers
- Modify audit records
- Access operational data outside their designated scope
- Override approval requirements for external actions

---

#### Layer 2 — Operational Leadership
**Who this is:** Directors, senior officials, ministers, programme directors, CMOs, and equivalent senior decision-makers.  
**What they can do:**
- Receive and action high-authority approval requests
- Access cross-functional dashboards and intelligence outputs
- Configure approval thresholds and escalation rules within their authority
- Commission strategic reports and briefings from Freya
- Set operational priorities and workflow parameters at the leadership level

**What they cannot do:**
- Modify system architecture or role configurations (without administrator involvement)
- Access departments or functions outside their designated scope
- Approve actions that require a different designated authority

---

#### Layer 3 — Operational Users
**Who this is:** Team leads, department managers, programme officers, compliance officers, SDRs, operations staff — the people doing the day-to-day work that Freya supports.  
**What they can do:**
- Initiate workflows within their designated scope
- Review and approve actions within their authorised threshold
- Access data and dashboards relevant to their function
- Communicate with Freya through natural language queries within their permission scope
- Escalate decisions that exceed their approval authority

**What they cannot do:**
- Approve actions above their configured authority threshold
- Access data from functions outside their scope
- Modify workflow configurations or approval routing rules
- View other users' approval queues or decision records

---

#### Layer 4 — View-Only and External Access
**Who this is:** Board members, external auditors, donor review teams, partner organisations, and others who require read access to specific outputs or records without operational involvement.  
**What they can do:**
- Access specified dashboards, reports, and data views within their granted scope
- Export records and reports within their permission level
- Submit queries to Freya where this is configured (for example, a donor querying programme performance)

**What they cannot do:**
- Initiate or approve any operational action
- Access data outside their explicitly granted scope
- Modify any system configuration or record

---

## Section 03 — Permission Dimensions

### The Six Dimensions of Role Configuration

Each role in Antarious is defined across six dimensions. Taken together, they produce a precise governance profile for every user — not a rough approximation of their authority, but an accurate reflection of what they should and should not be able to do.

#### Dimension 1 — Data Access Scope
Which data sources, dashboards, and intelligence outputs can this role see?

Scoping options include:
- **Function scope:** Access limited to data from a specific department, programme, or business unit
- **Geography scope:** Access limited to a specific region, country, or delivery area
- **Project scope:** Access limited to a specific programme, campaign, or initiative
- **Full scope:** Access across all connected data sources (typically reserved for senior leadership and system administrators)

Data access can be further restricted by **data sensitivity classification** — ensuring that personally identifiable information, financial data, or politically sensitive intelligence is accessible only to roles with a legitimate need.

#### Dimension 2 — Workflow Initiation Authority
Which workflows can this role instruct Freya to begin?

Examples of workflow initiation boundaries:
- An SDR can initiate a prospect outreach workflow but not a campaign strategy workflow
- A programme officer can initiate a partner data consolidation but not a donor report submission
- A compliance officer can initiate a compliance evidence compilation but not a budget reallocation recommendation

Initiation authority is defined by workflow category and can be scoped further by threshold — for example, a team lead can initiate outreach campaigns up to 500 contacts; above that, director approval is required to initiate.

#### Dimension 3 — Approval Authority
Which actions can this role approve for execution?

Approval authority is the most governance-critical dimension. It defines:
- **Which action categories** this role can approve
- **At what scale or threshold** their approval is sufficient
- **Whether their approval is final** or triggers a further step in a multi-level chain

Approval authority is always bounded upward — a role can approve within its threshold but cannot grant itself additional authority. Escalation above threshold is automatic and non-bypassable.

#### Dimension 4 — Freya Interaction Mode
How can this role communicate with and direct Freya?

Options include:
- **Full natural language:** The role can ask Freya any question and instruct any workflow within their scope using conversational input
- **Structured query only:** The role can submit queries using defined templates or a structured interface — useful for ensuring consistency in how certain roles interact with the system
- **Report and dashboard access only:** The role cannot initiate queries but receives scheduled outputs and has read access to dashboards

#### Dimension 5 — Configuration Authority
What can this role change about how Freya operates?

Configuration authority is typically restricted to system administrators and senior operational leadership. It governs:
- Ability to modify workflow parameters and agent configurations
- Ability to update approval routing rules and thresholds
- Ability to manage integrations and data connections
- Ability to create, modify, or revoke other user roles (typically system administrators only)

#### Dimension 6 — Audit and Reporting Access
What audit records and governance reports can this role access?

This dimension ensures that oversight functions — compliance officers, internal audit, external reviewers — have the access they need without that access extending to operational control. It also ensures that operational users cannot access the audit records of colleagues, protecting both privacy and governance integrity.

---

## Section 04 — Sector-Specific Role Examples

### How Role-Based Control Is Configured in Practice

#### Government Department

| Role | Data Scope | Initiation | Approval Authority | Audit Access |
|---|---|---|---|---|
| Minister | All departments | Strategic briefs | Final authority on policy actions | Full department |
| Director General | All departments | All workflows | Senior-level actions | Full department |
| Deputy Director | Assigned portfolios | Portfolio workflows | Mid-level actions | Portfolio scope |
| Senior Policy Officer | Own portfolio | Analysis, draft generation | Routine outputs within scope | Own actions |
| Compliance Officer | All departments | Compliance workflows | Compliance submissions | Full compliance scope |
| External Auditor | Defined scope | None | None | Audit scope only |

#### NGO / Development Organisation

| Role | Data Scope | Initiation | Approval Authority | Audit Access |
|---|---|---|---|---|
| Programme Director | All programmes | All workflows | All actions | Full programme |
| M&E Manager | All programmes | M&E workflows | M&E outputs | M&E scope |
| Programme Officer | Assigned programme | Programme workflows | Routine programme actions | Own actions |
| Finance Officer | Finance data | Finance workflows | Financial actions within threshold | Finance scope |
| Donor Representative | Defined programme | Query only | None | Reporting scope |

#### Business / GTM Team

| Role | Data Scope | Initiation | Approval Authority | Audit Access |
|---|---|---|---|---|
| CMO | All GTM functions | All GTM workflows | Campaign and budget authority | Full GTM |
| GTM Operations Lead | All GTM functions | Operational workflows | Operational actions | Full GTM |
| Marketing Manager | Marketing function | Marketing workflows | Marketing actions within threshold | Marketing scope |
| SDR Lead | Sales function | Outreach workflows | Outreach actions within volume threshold | Sales scope |
| Agency Client (view) | Client workspace | None | None | Client reporting only |

---

## Section 05 — Delegation and Temporary Access

### Governing Authority When People Are Unavailable

Organisations do not pause when key people are on leave, in transition, or temporarily unavailable. Antarious role-based control includes structured delegation mechanisms that preserve governance continuity without creating permanent access exceptions.

#### Formal Delegation
An approver with authority can formally delegate their approval role to a named deputy for a specified period. The delegation:
- Requires the delegating authority to specify the deputy, the scope of delegation, and the duration
- Is recorded in the audit trail with full detail
- Automatically expires at the defined end date — no manual revocation required
- Cannot exceed the delegating authority's own permission level (you cannot delegate authority you do not have)

#### Temporary Elevated Access
System administrators can grant time-bounded elevated access for specific purposes — for example, an external auditor requiring access during a review period, or a temporary staff member requiring access during a project.

Temporary access:
- Is scoped precisely to the data and actions required
- Has a defined expiry that cannot be extended without a new access grant
- Is fully logged in the audit trail, including the reason for the grant and who authorised it
- Automatically revokes at expiry, with no action required from the administrator

#### Staff Transitions
When a person leaves or changes roles, their access is revoked immediately upon role change in the Antarious system. Institutional knowledge is preserved in Freya's memory — it does not leave with the individual. The incoming person in the role can be granted access with their own defined permission profile, which may differ from their predecessor's.

---

## Section 06 — What Role-Based Control Prevents

### The Failure Modes It Is Designed to Eliminate

Role-based control in Antarious is not primarily about restriction — it is about ensuring that every action is taken by someone with the authority, context, and accountability appropriate to that action. The following failure modes are structurally prevented by the role architecture:

**Unauthorised workflow initiation**  
A user cannot instruct Freya to begin a workflow outside their designated scope. Attempts to do so are blocked and logged — not simply declined with an error message.

**Approval authority overreach**  
A user cannot approve an action that exceeds their configured authority threshold. The system automatically escalates to the appropriate higher authority without requiring the original approver to redirect manually.

**Data access beyond function**  
A user cannot access intelligence, dashboards, or records from outside their configured data scope — even if they can see those scopes exist. Data isolation is enforced at the query level, not at the interface level.

**Permission self-escalation**  
No user can modify their own permissions or approve actions on their own behalf. Configuration authority is separated from approval authority by design, and both are separated from audit access.

**Permanent access drift**  
Temporary access arrangements expire automatically. Role configurations are reviewed at configurable intervals and any access that has not been actively confirmed is flagged for administrator review.

---

## Section 07 — Governance Reporting

### Visibility Into How Authority Is Being Used

Role-based control is not only a preventive mechanism — it is a source of governance intelligence. Freya generates periodic governance reports for system administrators and senior leadership that surface:

- **Active roles and permission profiles** — a current map of who has what authority in the system
- **Approval distribution** — which roles are approving what volume and types of actions
- **Escalation patterns** — which action categories most frequently escalate above initial approval authority, and why
- **Delegation log** — all active and expired delegations within the review period
- **Exception log** — all blocked initiation attempts and access boundary encounters
- **Dormant access alerts** — roles that have not been used within a configured period, flagged for review

These reports are available on demand and can be scheduled for delivery to governance committees, internal audit, or senior leadership at any frequency.

---

## Section 08 — Compliance and Framework Alignment

| Framework | Role-Based Control Relevance |
|---|---|
| **ISO 27001 — Access Control (Annex A.9)** | Role-based access control aligned with least-privilege principle; access provisioning and revocation processes documented |
| **UK GDPR / EU GDPR — Data Minimisation** | Data access scoped to functional necessity; no role has access to data beyond its legitimate operational purpose |
| **EU AI Act — Human Oversight Requirements** | Clear authority structures for human oversight of AI outputs; approval authority bounded by role and threshold |
| **Government Security Classifications** | Data sensitivity tiers can be aligned with national security classification levels; access restricted accordingly |
| **Sarbanes-Oxley / Internal Controls** | Separation of duties enforced by role architecture; no individual has unilateral authority over both initiation and approval |
| **Donor Fiduciary Requirements** | Named accountable officers for all programme actions; authority structures verifiable through role configuration records |

---

## Section 09 — Frequently Asked Questions

**Q: How long does it take to configure roles for our organisation during deployment?**  
A: Role configuration is completed as part of the deployment engagement, typically over two to four weeks depending on organisational complexity. Antarious's implementation team works with your HR, IT, and governance leads to map your existing authority structures into the system before go-live.

**Q: Can we modify roles after deployment?**  
A: Yes. Role configurations can be updated by system administrators at any time. All configuration changes are logged in the audit trail, including who made the change, when, and what the previous configuration was.

**Q: What happens if someone needs access urgently outside their normal role?**  
A: Temporary elevated access can be granted by a system administrator within minutes. The access is scoped, time-bounded, and fully logged. It cannot be self-granted.

**Q: Can a user see what permissions they have?**  
A: Yes. Users can view a summary of their own permission profile within the platform. They cannot see other users' profiles unless they have administrator access.

**Q: How does role-based control interact with our existing SSO or identity management system?**  
A: Antarious supports integration with enterprise identity providers — including Microsoft Active Directory, Azure AD, Google Workspace, and SAML-compliant providers — so that role assignments can be synchronised with your existing user management infrastructure.

**Q: What if our organisation's authority structure is informal or matrix-based rather than hierarchical?**  
A: Role-based control in Antarious is flexible enough to reflect non-hierarchical authority structures. Matrix approval configurations — where an action requires approval from representatives of two or more functions simultaneously — are fully supported.

---

## Section 10 — Related Trust Pages

- [Human Approval →](#) — How approval authority within roles is exercised on specific actions
- [Audit Trail →](#) — How role-based access and authority decisions are permanently recorded
- [Security →](#) — How role configurations are protected against unauthorised modification

---

## CTA Block

**Heading:** Built around your governance structure.  
**Body:** Every Antarious deployment maps your organisation's authority structure into the platform before go-live. Request a briefing to walk through how role-based control would be configured for your team.  
**Primary CTA:** Request a Briefing →  
**Secondary CTA:** Download Governance Architecture Overview →

---

*Antarious AI · Trust Architecture · Role-Based Control*  
*Last reviewed: April 2026*
