# DE Visual System v2: Architecture, Precision & Evidence

> **Authoritative Hierarchy Note:** This document formalizes the DE Visual System v2. It builds directly on and points back to the foundational truths in:
> - [`BRAND.md`](./BRAND.md)
> - [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
> - [`UX_PRINCIPLES.md`](./UX_PRINCIPLES.md)
> - [`IMAGERY.md`](./IMAGERY.md)

---

## 1. Core Philosophy: Precision & Evidence without Noise

> **DE needs more technical precision, visual evidence, and interactivity — but not more visual noise.**

The brand explicitly rejects cyberpunk tropes, generic SaaS gimmicks, excessive glows, purple-filled panels, and decorative effects without purpose. The foundation is locked:
- **Base Canvas**: Graphite / Midnight Obsidian `#050312` (`--de-bg`)
- **Surfaces & Raised**: `#0a0a0a` → `#151217`
- **Editorial Paper**: Warm Limestone `#F7F5F2` (`--de-paper`)
- **Brand Accent**: Electric Magenta `#D3126A` (`--de-magenta`)
- **Typography**: Space Grotesk (Presentation / Headings) · Inter (Reading / UI) · Oxanium (Technical Metadata & Sequence)
- **Store Electric Blue**: Strictly scoped to `/store*` merchandising

---

## 2. The 8 Visual System Layers

| Layer | Name | DE Implementation & Rules |
| :--- | :--- | :--- |
| **0** | **Brand Foundation** | `#050312` graphite well, warm paper islands, magenta accent, Space Grotesk / Inter / Oxanium triad. |
| **1** | **Continuous Atmosphere** | Subtle fine grain (`--de-field-grain`), restrained dot matrix, environmental background plates, controlled violet illumination. |
| **2** | **Precision Chrome** | 1px hairlines, fine alignment ticks, subtle corner markers, technical containment frames (`HUDFrame`). |
| **3** | **Technical Metadata** | Oxanium labels, sequence numerals (`01 / IDENTITY`), status tokens, timestamps, telemetry metadata. |
| **4** | **Evidence Assets** | Assessment UI previews, roadmaps, architecture diagrams, real reports, portal interfaces (`EvidenceFrame`). |
| **5** | **Interactive Command Surfaces** | Capability switchers, coverage maps, incident timelines, comparison decks, interactive defense matrices. |
| **6** | **Human + Client Proof** | Real people, verified reviews, client case evidence, operational Arizona presence proof. |
| **7** | **Publishing & Product Universe** | Store media grammar, threat stories, guides, datasheets, report covers. |

---

## 3. Strict Truthfulness & Classification Rule

> **Never make simulated UI indistinguishable from actual customer data, live telemetry, measured DE performance, or a real incident.**

Every operational asset, interface preview, or telemetry component **must** carry one of four explicit classification tokens:

1. `LIVE`: Sourced from a genuine real-time feed with verified timestamp and data provenance.
2. `SANITIZED_REAL`: Sourced from an actual completed DE assessment, incident, or client deliverable with all PII and tenant identifiers redacted.
3. `EXAMPLE`: A realistic educational scenario demonstrating how the operating model functions (e.g. *Example Incident Flow*).
4. `ILLUSTRATIVE`: A conceptual architectural model or defense coverage visualization.

---

## 4. Master Design Rule for All Agents

> **Before creating any substantial visual element, determine what the visitor needs to understand or believe. Then select the strongest evidence form in this order:**
> 
> $$\text{Real Artifact} \longrightarrow \text{Real Data} \longrightarrow \text{Real Person} \longrightarrow \text{Explanatory Diagram} \longrightarrow \text{Sanitized Interface} \longrightarrow \text{Illustrative Scenario} \longrightarrow \text{Editorial Photography} \longrightarrow \text{Atmospheric Plate} \longrightarrow \text{Icon}$$
> 
> *Decorative visual treatment comes last.*
