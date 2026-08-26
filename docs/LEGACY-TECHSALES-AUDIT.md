# Legacy TechSales audit ledger

**Purpose:** Prevent both resurrecting obsolete TechSales code and discarding something unique before `digeratiexperts/TechSales` is GitHub-archived (not deleted).

**Rule:** Inspect TechSales read-only. Do not merge, cherry-pick, or deploy it. If something is truly missing, port it on Intelligence-Hub using current Hub architecture.

**Status of this file:** Partial. Endpoint classifications below are from DE’s 2026-08-26 history review plus this agent’s access check. A commit-by-commit cherry / patch-id ledger is **blocked** in this Cloud Agent environment: the GitHub token can see `digeratiexperts-site` / `Replit-Site` only. `Intelligence-Hub` and `TechSales` return “Repository not found.”

Do **not** archive TechSales until the unique-commit table is filled and no row is `PORT REQUIRED` without a Hub follow-up PR.

---

## Verdict key

| Verdict | Meaning |
|---------|---------|
| **PRESERVED** | The commit (or its exact tree) exists in Intelligence-Hub. Keep the SHA; do not port again. |
| **SUPERSEDED** | Later Hub work covers the same capability. Keep the SHA for history; do not merge. |
| **PORT REQUIRED** | Hub master lacks a capability this commit introduced. Port using current Hub code — do not merge the old branch. |
| **DO NOT USE** | Obsolete frontend, unused OAuth stub, or deploy-dangerous. Keep the SHA; never deploy. |
| **AUDIT BLOCKED** | This environment could not clone the remotes to prove equivalence. |

---

## Endpoints that must remain recoverable

| Source | SHA | Verdict | Evidence |
|--------|-----|---------|----------|
| TechSales `master` | `cfcc915db3ccaad0e3079813265cc44940749071` | **PRESERVED** | DE confirmed this exact SHA exists in Intelligence-Hub with the same 2026-04-05 commit and files. Hub did not start from a blank tree. |
| TechSales `cursor/password-reset-auth-47ec` | `6838b17471b34587df3003285b6dad23d34af5f6` | **PRESERVE / AUDIT BLOCKED** | Head updated 2026-07-27, after TechSales `master` froze. Own PR warned not to deploy the old repo wholesale (would replace live SalesOS with an older Vendor Intelligence dashboard). Branch was never VPS-deployed. |
| Intelligence-Hub password-reset (2026-07-28) | (Hub commit; confirm after clone) | **SUPERSEDED (claimed)** | DE: Hub received hashed reset tokens, 30-minute expiry, lockout, session revocation, URL-fragment handling, operator reset command, and tests the day after the TechSales auth branch. |
| Intelligence-Hub auth branch vs `master` | — | **SUPERSEDED (claimed)** | DE: that Hub auth branch is **0 commits ahead, 236 behind** `master` — an ancestor, not a fork still carrying unique commits. |
| Intelligence-Hub `master` (acceptance target) | `5703465e2f6e8385921f9adede7582df5e4f2fc9` | **NOT PRODUCTION-PROVEN HERE** | Acceptance record 2026-08-18: 10 automated passes, 0 failures, 15 blocked checks. Full issue remains open. Confirm `/opt/intelligence-hub/current/RELEASE_SHA` on the VPS. |
| `digeratiexperts/intelligencehub-` | (no commits) | **DO NOT USE** | Empty (0 bytes). Archive candidate. |

---

## Unique commits on `cursor/password-reset-auth-47ec`

Fill this table after a read-only clone. Commands (do not push to TechSales):

```bash
# Read-only
git clone --no-checkout git@github.com:digeratiexperts/TechSales.git /tmp/techsales-ro
git -C /tmp/techsales-ro fetch origin cursor/password-reset-auth-47ec
git clone git@github.com:digeratiexperts/Intelligence-Hub.git /tmp/intelligence-hub

LEGACY_MASTER=cfcc915db3ccaad0e3079813265cc44940749071
AUTH=6838b17471b34587df3003285b6dad23d34af5f6

# Unique commits on the July auth line after frozen master
git -C /tmp/techsales-ro log --oneline --reverse ${LEGACY_MASTER}..${AUTH}

# Patch equivalence vs Hub master (no merge)
git -C /tmp/intelligence-hub fetch /tmp/techsales-ro ${AUTH}:refs/legacy/techsales-auth
git -C /tmp/intelligence-hub cherry master refs/legacy/techsales-auth
git -C /tmp/intelligence-hub log --format='%H %s' ${LEGACY_MASTER}..${AUTH} | while read sha subject; do
  echo "---- $sha $subject"
  git -C /tmp/intelligence-hub log --all --grep="$(printf '%s' "$subject" | head -c 60)" --oneline | head
done
```

Preserve the endpoints inside Intelligence-Hub **without merging**:

```bash
git -C /tmp/intelligence-hub tag -a legacy/techsales-master-cfcc915 $LEGACY_MASTER -m "Frozen TechSales master 2026-04-05"
git -C /tmp/intelligence-hub fetch /tmp/techsales-ro $AUTH
git -C /tmp/intelligence-hub tag -a legacy/techsales-auth-6838b17 $AUTH -m "TechSales cursor/password-reset-auth-47ec 2026-07-27 — do not merge or deploy"
```

| SHA | Subject | Verdict | Notes |
|-----|---------|---------|-------|
| *unpopulated* | — | **AUDIT BLOCKED** | Token in this environment cannot list TechSales commits. |

---

## Capabilities already named (semantic, not patch-id)

These are feature names from the July auth PR and the July 28 Hub work. Names alone are **not** a port order.

| Capability | TechSales July branch | Intelligence-Hub (claimed) | Next action |
|------------|----------------------|----------------------------|-------------|
| Secure admin auth | Present | Present on `master` (ancestor of current) | Confirm with patch-id; expected **SUPERSEDED** |
| Operator password-reset utilities | Present | Operator reset command + tests (2026-07-28) | Confirm; expected **SUPERSEDED** |
| User operations / session handling | Present | Session revocation on Hub | Confirm; expected **SUPERSEDED** |
| Hashed reset tokens, 30-min expiry, lockout | Not asserted as identical | Present 2026-07-28 | Hub version is the one to keep |
| Production bundles / Vendor Intelligence dashboard | Present | **DO NOT USE** | Old frontend. Deploying TechSales would replace live SalesOS. |
| Live OAuth / production SalesOS `/assistant` | Explicitly **absent** on TechSales | Lives on Intelligence-Hub | **DO NOT USE** TechSales for this |

---

## Archive gate

Archive `digeratiexperts/TechSales` on GitHub (settings → Archive) only when all of the following are true:

1. Both endpoint SHAs are tagged or otherwise reachable from Intelligence-Hub without a merge.
2. Every unique commit in `${LEGACY_MASTER}..${AUTH}` has a verdict other than **AUDIT BLOCKED**.
3. Every **PORT REQUIRED** row has a Hub PR that ports the capability on current architecture.
4. `digeratiexperts/intelligencehub-` may be archived independently (empty).

Do not delete either repository.
