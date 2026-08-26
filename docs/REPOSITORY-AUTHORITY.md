# Repository authority

Read this file before touching any other Digerati Experts repository.

Committed ≠ merged ≠ deployed ≠ production-verified.

---

## CANONICAL TECHSALES / INTERNAL HUB

**Repository:** `digeratiexperts/Intelligence-Hub`  
**Default production branch:** `master`  
**Production root:** `/opt/intelligence-hub`  
**Production service:** `intelligence-hub.service`  
**Production URL:** `https://techsales.digerati-experts.com`  
**Production port:** `3100`  
**Deploy:** VPS-local release script (GitHub Actions verifies the production build only — it does not deploy)

Agents **may** implement TechSales / Internal Hub work here, on a feature branch, after reading this file.

The last production-acceptance target DE recorded was `master` SHA `5703465e2f6e8385921f9adede7582df5e4f2fc9` (2026-08-18). That does **not** prove the VPS is on that SHA. Confirm with `/opt/intelligence-hub/current/RELEASE_SHA` before claiming production is current.

---

## CANONICAL WEBSITE / STORE / CLIENT PORTAL

**Repository:** `digeratiexperts/digeratiexperts-site`  
**Historical remote name:** `digeratiexperts/Replit-Site` (same product; do not treat as a third site)  
**Default branch:** `main`  
**Production app:** same Node process on `:3300`  
**Website:** `https://digeratiexperts.com`  
**Portal:** `https://portal.digeratiexperts.com/portal/login` (never invent `//login`)

Agents **may** implement public Website, Store, and Client Portal work here.

Open website PRs are **not** live until they are on `main` **and** deployed. As of 2026-08-26, #57 (brand naming) and #59 (campaign landers) are still open drafts.

---

## LEGACY — DO NOT MODIFY OR DEPLOY

**Repository:** `digeratiexperts/TechSales`

- Classification: **LEGACY — FREEZE**
- Agents: **READ ONLY**
- Do not edit, merge from, cherry-pick from, deploy from, or synchronize automatically
- Do not delete the GitHub repository
- Archive on GitHub only after `docs/LEGACY-TECHSALES-AUDIT.md` is a complete commit ledger (PRESERVED / SUPERSEDED / PORT REQUIRED / DO NOT USE)

Preserved endpoints (do not drop these SHAs):

| Ref | SHA | Role |
|-----|-----|------|
| TechSales `master` (stopped 2026-04-05) | `cfcc915db3ccaad0e3079813265cc44940749071` | Carried into Intelligence-Hub (same April 5 commit). **PRESERVED.** |
| TechSales `cursor/password-reset-auth-47ec` | `6838b17471b34587df3003285b6dad23d34af5f6` | July 27 auth/password-reset work. Never VPS-deployed. **PRESERVE until semantic audit completes.** |

---

## EMPTY / HISTORICAL — DO NOT USE

**Repository:** `digeratiexperts/intelligencehub-`

Created/pushed 2026-07-14. Size 0. No commits. Archive candidate. Do not develop here.

---

## Agent rules

Use `digeratiexperts/Intelligence-Hub` exclusively for TechSales / Internal Hub work. `digeratiexperts/TechSales` is legacy and READ-ONLY. Do not edit, merge from, cherry-pick from, deploy from, or synchronize it automatically. If a historical comparison is needed, inspect it read-only and report findings. Use `digeratiexperts/digeratiexperts-site` only for the public Website, Store, and Client Portal portions of the implementation.

If a Hub capability is missing, port it using **current Intelligence-Hub architecture**. Do not revive the Vendor Intelligence dashboard or any old SalesOS frontend from TechSales.

---

## Twin copy

The same policy belongs in `digeratiexperts/Intelligence-Hub` at `docs/REPOSITORY-AUTHORITY.md`. This website copy exists so agents already inside `digeratiexperts-site` cannot miss it. If the two files ever diverge, treat the Hub file as authoritative for Hub deploy facts and this file as authoritative for website/portal facts; reconcile immediately.
