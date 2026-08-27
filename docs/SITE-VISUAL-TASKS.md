# DE Site-Wide Visual Tasks & Multi-Agent Ledger

> **Governance Rules:**
> 1. **One task = One owner = One branch.**
> 2. No agent starts a task marked **IN PROGRESS** by another owner.
> 3. Status progression: `BACKLOG` → `READY` → `IN PROGRESS` → `PR READY` → `VISUAL REVIEW` → `APPROVED` → `MERGED` → `LIVE`.
> 4. Before declaring complete: verify 390px, 768px, 1440px with rendered visual evidence.

---

## Visual Tasks Ledger

| ID | Task | Owner | Branch | Dependencies | Target Files / Component | Status | Visual QA | Approved |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **VIS-001** | Visual System v2 Docs & Rules | Antigravity / Claude | `main` | None | `design/VISUAL_SYSTEM_V2.md`, `design/*.md` | **LIVE** | Passed | Yes |
| **VIS-002** | `EvidenceFrame` + Classifications | Antigravity | `main` | VIS-001 | `client/src/components/evidence/EvidenceFrame.tsx` | **LIVE** | Passed | Yes |
| **VIS-003** | `HUDFrame` + `StatusToken` + `ProofChip` | Antigravity | `main` | VIS-001 | `client/src/components/evidence/HUDFrame.tsx`, `StatusToken.tsx`, `ProofChip.tsx` | **LIVE** | Passed | Yes |
| **VIS-004** | Diagram Primitives (`DiagramNode`, `Boundary`) | Antigravity | `main` | VIS-001, VIS-003 | `client/src/components/evidence/DiagramPrimitives.tsx` | **LIVE** | Passed | Yes |
| **VIS-005** | DE Protection Coverage Architecture | Antigravity | `main` | VIS-002, VIS-003 | `client/src/components/visual/ProtectionCommandDeck.tsx` | **LIVE** | Passed | Yes |
| **VIS-006** | ProActive Ecosystem Flagship Diagram | Antigravity | `main` | VIS-004 | `client/src/components/visual/ProActiveEcosystemDiagram.tsx` | **LIVE** | Passed | Yes |
| **VIS-007** | Assessment `EvidenceFrame` Preview | Antigravity | `main` | VIS-002 | `client/src/components/evidence/AssessmentReportSample.tsx` | **LIVE** | Passed | Yes |
| **VIS-008** | `IncidentFlow` Example Scenario Module | Antigravity | `main` | VIS-002, VIS-003 | `client/src/components/evidence/IncidentFlow.tsx` | **LIVE** | Passed | Yes |
| **VIS-009** | Protection Interactive Command Deck (6 Domains) | Antigravity | `main` | VIS-005, VIS-008 | `client/src/pages/sections/DigeratiHowWeProtectSection.tsx` | **LIVE** | Passed | Yes |
| **VIS-010** | Environment Plates Set (4 Plates) | Art Direction | — | VIS-001 | `attached_assets/plates/*` | **BACKLOG** | — | — |
| **VIS-011** | Store Product-Media System | Cursor / Claude | — | VIS-002, VIS-003 | `client/src/components/store/ProductMedia.tsx` | **BACKLOG** | — | — |
| **VIS-012** | Photography Plan & Asset Matrix | Content / Human | — | VIS-001 | `design/PHOTOGRAPHY.md` | **BACKLOG** | — | — |
| **VIS-013** | Proof System & Verification Matrix | Claude / Cursor | — | VIS-003 | `client/src/components/evidence/ProofGrid.tsx` | **BACKLOG** | — | — |
| **VIS-014** | Threat Story Template ("The Account...") | Claude | — | VIS-002, VIS-004 | `client/src/pages/resources/ThreatStoryTemplate.tsx` | **BACKLOG** | — | — |
| **VIS-015** | Editorial & Publication Templates | Antigravity | — | VIS-001, VIS-002 | `client/src/components/editorial/*` | **BACKLOG** | — | — |
| **VIS-016** | Final Site-Wide Propagation & Full QA | Coordinated | — | VIS-001–VIS-015 | Site-wide | **BACKLOG** | — | — |
