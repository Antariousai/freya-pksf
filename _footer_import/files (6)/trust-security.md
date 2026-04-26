# Security
### Trust · Antarious AI

---

## Page Header

**Section Label:** Trust Architecture  
**Page Title:** Security  
**Tagline:** Antarious handles sensitive operational data across enterprise, government, and development environments. Security is not a feature layer. It is the foundation everything else is built on.  
**Supporting Statement:** Antarious AI is designed to operate in environments where data is sensitive, stakes are high, and security failures carry real consequences — financial, reputational, legal, and human. Every component of the platform — from data ingestion to approval workflows to audit record storage — is built to the security standards that those environments demand.

---

## Section 01 — Security Philosophy

### Controls That Are Proportionate to the Stakes

Security architecture in enterprise and government contexts is not about checking compliance boxes. It is about building systems that fail safely, protect the right things with proportionate controls, and give security teams the visibility they need to detect and respond to threats in real time.

Antarious is built on three security principles that shape every design decision:

**1. Least Privilege by Default**  
No component of the system — user, agent, integration, or process — has access to more data or capability than is required for its specific function. Privilege is granted explicitly, not assumed.

**2. Defence in Depth**  
No single security control is relied upon exclusively. Layered controls mean that the failure of any one mechanism does not create a systemic vulnerability. Access controls, encryption, network segmentation, monitoring, and audit are all applied together.

**3. Transparency Over Obscurity**  
Security posture is documented and auditable, not hidden. Customers, auditors, and security teams can verify how Antarious protects their data — they do not have to take our word for it. Detailed security documentation is available under NDA for enterprise and government deployments.

---

## Section 02 — Data Protection

### How Your Data Is Protected at Rest and in Transit

#### Encryption at Rest
All data stored within the Antarious platform — including operational data, audit records, institutional memory, and user data — is encrypted at rest using **AES-256**, the current gold standard for symmetric encryption and the standard required by most enterprise, government, and financial sector security frameworks.

Encryption keys are:
- Managed using a dedicated key management service with hardware security module (HSM) backing
- Rotated on a defined schedule
- Stored separately from the data they protect
- Never accessible to Antarious personnel in plaintext form

Customer-managed encryption keys (CMEK) are available for organisations with specific key sovereignty requirements — including government entities and organisations with regulatory obligations over their encryption infrastructure.

#### Encryption in Transit
All data in transit between your systems and Antarious — and between Antarious components — is encrypted using **TLS 1.3**. Older protocol versions (TLS 1.0, TLS 1.1, SSL) are not supported. Certificates are managed through automated issuance and renewal to eliminate the risk of expired certificate vulnerabilities.

#### Data Isolation
Customer data is logically isolated at the infrastructure level. Data from one customer organisation cannot be accessed by another — including through cross-tenant queries, shared caches, or any other vector. For government and high-sensitivity deployments, physical data isolation options are available.

---

## Section 03 — Infrastructure and Architecture

### Built on Enterprise-Grade Infrastructure

#### Cloud Infrastructure
Antarious is deployed on enterprise-grade cloud infrastructure with the following characteristics:

- **Availability:** Infrastructure is designed for high availability with redundancy across availability zones. Uptime targets and service level commitments are defined in customer agreements.
- **Geographic deployment:** Data residency can be configured to specific geographic regions for customers with data sovereignty requirements. Supported regions are confirmed during deployment planning.
- **Scalability:** Infrastructure scales automatically to maintain performance under high load — including peak reporting periods, large-scale outreach campaigns, and simultaneous multi-department operations.
- **Backup and recovery:** Data is backed up continuously with defined recovery point objectives (RPO) and recovery time objectives (RTO). Backup integrity is tested on a regular schedule.

#### Network Security
- **Network segmentation:** The Antarious platform is segmented such that compromise of one component does not provide lateral access to others.
- **Web Application Firewall (WAF):** All external-facing endpoints are protected by a WAF configured to detect and block common attack vectors including SQL injection, cross-site scripting (XSS), and request forgery.
- **DDoS protection:** Infrastructure-level distributed denial-of-service protection is applied to all external endpoints.
- **Private connectivity:** For government and enterprise deployments requiring it, private network connectivity options (including VPN and private peering) are available as an alternative to public internet routing.

#### API Security
All Antarious APIs — including those used for integration with your existing systems — are secured through:
- **API key authentication** with configurable rotation schedules
- **OAuth 2.0** for user-delegated access flows
- **Rate limiting** to prevent abuse and protect system stability
- **Request signing** to verify the authenticity of API calls
- **Scope-limited tokens** that restrict what any given API credential can access

---

## Section 04 — Access Control and Identity

### Who Can Access What, and How That Is Verified

#### Authentication
All access to the Antarious platform requires authentication. Supported authentication mechanisms:

- **Username and password** with enforced complexity requirements and breach detection (passwords identified in known breach datasets are flagged and reset is required)
- **Multi-factor authentication (MFA):** Required for all users. Supported factors include authenticator apps (TOTP), hardware security keys (FIDO2/WebAuthn), and enterprise SSO MFA
- **Single Sign-On (SSO):** Integration with enterprise identity providers including Microsoft Azure AD, Google Workspace, Okta, and SAML 2.0-compliant providers — allowing Antarious access to be governed by your existing identity infrastructure
- **Session management:** Sessions have configurable timeout periods; concurrent session limits can be applied by role

#### Privileged Access
Administrative and system-level access within Antarious is subject to additional controls:
- Privileged access requires separate authentication (not elevated through a standard session)
- All privileged access sessions are logged in full, including commands executed and data accessed
- Privileged access is time-bounded — sessions automatically terminate after a configured period
- Just-in-time (JIT) privileged access is available for deployments requiring it — administrative access is granted on request, for a defined window, and automatically revoked

#### Third-Party Access
Where Antarious personnel require access to customer environments for support, maintenance, or incident response purposes:
- Access requires explicit customer authorisation
- All access sessions are logged and the log is available to the customer
- Access is scoped to the minimum required for the specific purpose
- No standing access to customer environments is maintained by Antarious personnel

---

## Section 05 — Integration Security

### Protecting the Connections Between Antarious and Your Systems

Antarious integrates with a wide range of external platforms — CRM systems, data warehouses, communication tools, field data platforms, government information systems, and more. Each integration represents a data connection that must be secured.

#### Integration Security Principles

**Credential management**  
Integration credentials (API keys, OAuth tokens, service account credentials) are stored encrypted, never logged in plaintext, and rotated on a configurable schedule. They are accessible only to the specific Antarious agent or process that requires them.

**Minimum permission integrations**  
Where Antarious connects to your external systems, it requests only the permissions required for its specific function. A read-only integration does not request write permissions. An integration that writes to a specific object in your CRM does not request access to unrelated objects.

**Integration audit**  
All data flows through integrations — both inbound and outbound — are logged. This creates a complete data lineage record: where data came from, when it was ingested, how it was processed, and where it went. This is particularly relevant for donor and regulatory audit requirements.

**Integration health monitoring**  
Antarious continuously monitors the health and behaviour of active integrations. Anomalous data patterns — unexpected volumes, unusual access times, unfamiliar data shapes — trigger alerts to system administrators before they create data quality or security issues.

---

## Section 06 — Vulnerability Management

### Finding and Fixing Weaknesses Before They Are Exploited

#### Penetration Testing
Antarious undergoes regular penetration testing by independent third-party security specialists. Testing covers:
- Application-layer security (web application, API, authentication)
- Infrastructure-layer security (network, cloud configuration, privilege escalation)
- Social engineering resilience
- Integration security

Penetration test findings are remediated on a risk-prioritised schedule. Summaries of penetration test outcomes are available to enterprise and government customers under NDA.

#### Vulnerability Scanning
Automated vulnerability scanning runs continuously across the Antarious codebase and infrastructure. Findings are triaged by severity:

| Severity | Response Target |
|---|---|
| Critical | Remediation within 24 hours |
| High | Remediation within 7 days |
| Medium | Remediation within 30 days |
| Low | Scheduled remediation in next release cycle |

#### Dependency Management
All third-party software dependencies used in the Antarious platform are tracked and monitored for disclosed vulnerabilities. Security patches for dependencies are applied on the same severity-tiered schedule as platform vulnerabilities.

#### Responsible Disclosure
Antarious maintains a responsible disclosure programme for security researchers who identify vulnerabilities in the platform. Findings submitted through the programme are reviewed, acknowledged, and remediated in accordance with coordinated disclosure timelines.

---

## Section 07 — Security Monitoring and Incident Response

### Detecting, Containing, and Responding to Security Events

#### Continuous Security Monitoring
The Antarious platform is monitored continuously for security events, including:
- Authentication anomalies (unusual login times, locations, or failure patterns)
- Access control violations and boundary encounters
- Data access patterns that deviate from established baselines
- Integration anomalies and unexpected data flows
- System configuration changes
- Privileged access session activity

Security monitoring is provided through a security information and event management (SIEM) system with real-time alerting to the Antarious security team.

#### Incident Response

In the event of a confirmed security incident affecting customer data, Antarious follows a defined incident response process:

**Stage 1 — Detection and Containment**  
The affected system or data is isolated to prevent further exposure. This occurs within minutes of confirmed detection.

**Stage 2 — Assessment**  
The scope, nature, and impact of the incident is assessed. What data was affected? How was access obtained? What is the blast radius?

**Stage 3 — Customer Notification**  
Customers whose data is affected are notified within 72 hours of confirmed incident detection — in line with GDPR notification requirements and ahead of most other regulatory timelines. Notification includes what is known at the time, what actions Antarious is taking, and what customers should do.

**Stage 4 — Remediation**  
The vulnerability or access vector that enabled the incident is remediated. Affected systems are restored from verified clean backups where necessary.

**Stage 5 — Post-Incident Review**  
A post-incident review produces a written account of the incident, root cause analysis, and the changes made to prevent recurrence. This report is shared with affected customers.

#### Business Continuity
Antarious maintains a tested business continuity plan covering infrastructure failure, data centre outage, and other operational disruption scenarios. Recovery time objectives are defined by service tier and are documented in customer agreements.

---

## Section 08 — Personnel Security

### Security Starts With People

#### Background Verification
All Antarious personnel with access to customer data or production systems undergo background verification appropriate to their role. This includes identity verification, employment history checks, and criminal record checks where legally permitted in the relevant jurisdiction.

#### Security Training
All Antarious personnel complete security awareness training at onboarding and on an annual basis. Personnel in roles with elevated data access or security responsibility complete additional role-specific training.

#### Access Governance
Antarious personnel access to customer systems and data is governed by the same least-privilege and need-to-know principles applied to customer users. Access is reviewed quarterly and revoked immediately upon role change or departure.

#### Confidentiality
All Antarious personnel are bound by confidentiality obligations covering customer data. These obligations survive the end of employment.

---

## Section 09 — Compliance and Certification Posture

### The Frameworks That Shape Our Security Programme

Antarious's security programme is designed in alignment with recognised security frameworks and applicable regulatory requirements. The following reflects the current posture and ongoing certification activity.

| Framework / Standard | Status |
|---|---|
| **ISO/IEC 27001 — Information Security Management** | Programme aligned; certification in progress |
| **SOC 2 Type II — Security, Availability, Confidentiality** | Assessment in progress |
| **UK GDPR / EU GDPR** | Compliant by design; Data Processing Agreements (DPAs) available |
| **UK Cyber Essentials** | Aligned; certification in progress |
| **NCSC Cloud Security Principles (UK Government)** | Assessed against all 14 principles; documentation available for government customers |
| **NIST Cybersecurity Framework** | Programme mapped to CSF core functions: Identify, Protect, Detect, Respond, Recover |
| **EU AI Act — Security Requirements for AI Systems** | Design aligned with transparency, robustness, and cybersecurity requirements |

Detailed compliance documentation, including control mappings, is available to enterprise and government customers under NDA as part of the security due diligence process.

---

## Section 10 — Data Processing and Privacy

### How Personal Data Is Handled Within the Platform

#### Data Processing Agreements
For all deployments where Antarious processes personal data on behalf of a customer organisation, a Data Processing Agreement (DPA) is executed prior to go-live. The DPA defines:
- The categories of personal data processed
- The purposes and legal bases for processing
- The obligations of Antarious as a data processor
- Sub-processor details and commitments
- Data subject rights support procedures
- Breach notification obligations

#### Sub-Processors
Antarious uses a limited number of sub-processors for infrastructure and operational purposes. A current list of sub-processors is maintained and made available to customers. Customers are notified of changes to the sub-processor list in advance.

#### Data Minimisation
Antarious processes only the data necessary for the functions your organisation has configured. Data that is not required for a specific agent or workflow is not ingested, stored, or processed.

#### Right to Erasure and Data Portability
Antarious supports data subject rights requests under applicable data protection law, including the right to erasure and the right to data portability. Processes for submitting and fulfilling such requests are defined in the DPA and available from the Antarious legal team.

---

## Section 11 — Frequently Asked Questions

**Q: Where is our data stored geographically?**  
A: Data residency is configured during deployment. Supported regions are confirmed during pre-deployment planning. Government and high-sensitivity deployments can be configured for specific jurisdictions to meet data sovereignty requirements.

**Q: Can we conduct our own security assessment of the Antarious platform?**  
A: Yes. Enterprise and government customers can request a security review engagement, including access to detailed technical documentation, compliance evidence, and in some cases a scoped penetration test of the customer-specific deployment. Contact your account team to initiate a security review.

**Q: Does Antarious use our data to train AI models?**  
A: No. Customer data is not used to train Antarious AI models or shared with third parties for model training purposes. This commitment is documented in the DPA.

**Q: What happens to our data if we end our contract with Antarious?**  
A: Upon contract termination, customers can export their data in standard formats. Following a defined transition period (specified in the customer agreement), data is securely deleted from Antarious systems. Deletion is confirmed in writing.

**Q: How are security vulnerabilities disclosed to customers?**  
A: Vulnerabilities that affect customer security posture or data are communicated directly to affected customers through secure channels, with clear information about the vulnerability, its impact, and the remediation taken or required.

**Q: Is Antarious available for on-premises or private cloud deployment?**  
A: Private cloud and dedicated deployment options are available for government and enterprise customers with specific infrastructure requirements. Contact the Antarious team to discuss deployment architecture options.

---

## Section 12 — Requesting Security Documentation

### For Due Diligence, Procurement, and Audit Purposes

Antarious provides the following security documentation to qualified enterprise and government customers as part of a security due diligence engagement:

- Security Architecture Overview
- Data Flow Diagrams
- Penetration Test Summary (most recent, redacted)
- Compliance Control Mapping (ISO 27001, NCSC Cloud Principles, NIST CSF)
- Sub-Processor List
- Data Processing Agreement (standard form)
- Business Continuity and Disaster Recovery Summary
- Incident Response Process Documentation

To request security documentation, contact: **security@antarious.ai**

For procurement and due diligence questionnaires, please submit through the same channel with your organisation's questionnaire attached. Standard questionnaire turnaround is five business days.

---

## Section 13 — Related Trust Pages

- [Human Approval →](#) — How human oversight is enforced at every action
- [Audit Trail →](#) — How security events and operational actions are permanently logged
- [Role-Based Control →](#) — How access boundaries are defined and enforced

---

## CTA Block

**Heading:** Security documentation available for due diligence.  
**Body:** Enterprise and government procurement teams can request detailed security architecture documentation, compliance evidence, and a security briefing with the Antarious technical team.  
**Primary CTA:** Request Security Briefing →  
**Secondary CTA:** Contact security@antarious.ai →

---

*Antarious AI · Trust Architecture · Security*  
*Last reviewed: April 2026*
