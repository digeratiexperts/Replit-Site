/**
 * The DE speech-bubble glyph — Joe's approved Ask DE artwork rebuilt as a
 * clean vector: a rounded speech bubble with a bottom-left tail, bold "DE"
 * set inside, and a single filled dot after it (a quiet "we're listening"
 * period, not a live-status indicator). Canonical standalone artwork lives at
 * client/src/assets/ask-de.svg; this component renders the same geometry
 * inline so it can inherit currentColor from whatever surface it sits on
 * (white launcher circle, dark nav, light panel header).
 *
 * This is a UI control glyph, not a logo plate: no fill, no baked background,
 * no shadow, no outer ring. The button around it provides the surface.
 */
export function AskDeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 5.6h12.4a5.6 5.6 0 0 1 5.6 5.6v5.2a5.6 5.6 0 0 1-5.6 5.6h-7.9c-1.2 3.1-3.7 5-7.9 5.7 1.9-1.6 2.8-3.5 2.9-5.8a5.6 5.6 0 0 1-5.1-5.5v-5.2A5.6 5.6 0 0 1 10 5.6Z"
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="14.6"
        y="14.2"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Space Grotesk', Arial, sans-serif"
        fontSize="9.4"
        fontWeight={700}
        letterSpacing="-0.3"
        fill="currentColor"
      >
        DE
      </text>
      <circle cx="22.9" cy="17.4" r="1.75" fill="currentColor" />
    </svg>
  );
}
