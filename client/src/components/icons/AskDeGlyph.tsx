/**
 * The Ask DE launcher glyph — a small line-art speech bubble with "DE" set
 * inside it. Canonical artwork lives at client/src/assets/ask-de.svg; this
 * component renders the same geometry inline so it can inherit currentColor
 * from whatever surface it sits on (the launcher circle, dark or light).
 *
 * This is a UI control glyph, not a logo: no fill, no baked background
 * plate, no shadow, no outer ring. The button around it provides the
 * surface — this asset is only the icon.
 */
export function AskDeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="12.5"
        y="11.6"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Space Grotesk', Arial, sans-serif"
        fontSize="7.6"
        fontWeight={800}
        letterSpacing="-0.2"
        fill="currentColor"
      >
        DE
      </text>
    </svg>
  );
}
