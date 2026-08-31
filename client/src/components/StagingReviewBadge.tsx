/**
 * Review-instance marker.
 *
 * Renders ONLY when the build is stamped as a staging review deployment
 * (`VITE_DE_STAGING_REVIEW=1`). It makes a preview unmistakable so nobody
 * confuses it with production, and it records exactly which branch/PR/SHA was
 * reviewed — that string is the evidence attached to an approval.
 *
 * Deliberately unobtrusive: a small fixed chip in the top-left, above page
 * content but below modals, non-interactive so it can never intercept a click
 * (it is `pointer-events-none` and not focusable). Collapses to a compact form
 * on narrow screens so it never collides with nav or floating chrome.
 */
export function StagingReviewBadge(): JSX.Element | null {
  const enabled = import.meta.env.VITE_DE_STAGING_REVIEW === "1";
  if (!enabled) return null;

  const label = import.meta.env.VITE_DE_REVIEW_LABEL || "STAGING";
  const sha = (import.meta.env.VITE_DE_REVIEW_SHA || "").slice(0, 7);

  return (
    <div
      className="pointer-events-none fixed left-2 top-2 z-[100] flex items-center gap-2 rounded-md border border-amber-400/40 bg-black/85 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300 shadow-lg backdrop-blur-sm"
      role="status"
      aria-label={`Staging review instance ${label}${sha ? ` at commit ${sha}` : ""} — not production`}
      data-testid="staging-review-badge"
    >
      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
      <span>{label}</span>
      {sha && <span className="hidden text-amber-300/70 sm:inline">{sha}</span>}
    </div>
  );
}
