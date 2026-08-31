import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Dictionary-style pronunciation entry for "Digerati".
 *
 * AUDIO_SRC — point this at a recorded file (e.g. "/audio/digerati-pronunciation.mp3")
 * and it takes priority over speech synthesis for full-word playback. A real
 * recording is strongly preferred: synthesis voices differ per browser and OS and
 * mangle invented phonetic spellings. Synthesis stays as the offline fallback and
 * always drives the per-syllable chips.
 *
 * Colour note: gold #e7b20d appears only as the wordmark bars, per
 * design/UI-STYLE-RULES.md ("gold is the wordmark bars only, never a CTA,
 * numeral, or fill"). Every accent that is a fill, numeral, or rule uses the
 * page accent token, which is magenta on the homepage.
 */
const AUDIO_SRC = "";
const SPOKEN_PRONUNCIATION = "dij-uh-RAH-tee";
const SPEECH_RATE = 0.78;

interface Syllable {
  /** Chip face. */
  label: string;
  /** Fed to speech synthesis when the chip is tapped. */
  say: string;
  /** Small hint under the chip. */
  hint: string;
  stressed?: boolean;
}

const SYLLABLES: Syllable[] = [
  { label: "DIJ", say: "dij", hint: "as in digit" },
  { label: "UH", say: "uh", hint: "unstressed" },
  { label: "RAH", say: "rah", hint: "stress here", stressed: true },
  { label: "TEE", say: "tee", hint: "as in tea" },
];

/** Wordmark bar geometry, traced from client/src/assets/logo.png. */
const MARK_BARS = [
  { x: 0, y: 1, w: 34 },
  { x: 7, y: 12, w: 24 },
  { x: 6, y: 23, w: 25 },
  { x: 0, y: 34, w: 34 },
];

/** Bar widths cycle through these while audio plays, one step per tick. */
const METER_STEPS = [1, 0.62, 0.45, 0.62];
const METER_TICK_MS = 150;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The DE wordmark, reused as the playback level meter: the bars contract left to
 * right while audio is playing, so the mark itself carries the playing state and
 * the card needs no separate playback decoration.
 *
 * The ripple is driven from component state rather than a @keyframes rule on
 * purpose. The entry stylesheet sits within ~0.5 kB of the CI budget in
 * scripts/check-bundle-budget.mjs, so a visual flourish here must not spend
 * global CSS that a future page section will need.
 */
function WordmarkMeter({ speaking }: { speaking: boolean }): JSX.Element {
  const [phase, setPhase] = useState(0);
  const animate = speaking && !prefersReducedMotion();

  useEffect(() => {
    if (!animate) {
      setPhase(0);
      return;
    }
    const id = window.setInterval(() => setPhase((p) => p + 1), METER_TICK_MS);
    return () => window.clearInterval(id);
  }, [animate]);

  return (
    <svg
      viewBox="0 0 34 41"
      className="flex-none" style={{ height: 36, width: 30 }}
      aria-hidden="true"
      data-testid="pronunciation-wordmark-meter"
    >
      {MARK_BARS.map((bar, i) => (
        <rect
          key={bar.y}
          x={bar.x}
          y={bar.y}
          width={bar.w}
          height={7}
          rx={3.5}
          fill="#e7b20d"
          style={{
            transformBox: "fill-box",
            transformOrigin: "left center",
            transform: animate ? `scaleX(${METER_STEPS[(phase + i) % METER_STEPS.length]})` : undefined,
            transition: `transform ${METER_TICK_MS}ms ease-in-out`,
          }}
        />
      ))}
    </svg>
  );
}

interface PronunciationCardProps {
  className?: string;
}

export function PronunciationCard({ className = "" }: PronunciationCardProps): JSX.Element {
  const [speaking, setSpeaking] = useState(false);
  const [status, setStatus] = useState("Ready to play pronunciation.");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;
  const canPlay = Boolean(AUDIO_SRC) || hasSpeech;

  // Stop in-flight playback if the hero unmounts mid-utterance.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      audioRef.current?.pause();
    };
  }, []);

  const speak = (text: string, label: string) => {
    if (!hasSpeech || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus(`Audio pronunciation is not supported in this browser. Say ${SPOKEN_PRONUNCIATION}.`);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = SPEECH_RATE;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => {
      setSpeaking(true);
      setStatus(`Playing ${label}.`);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setStatus("Pronunciation finished.");
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setStatus(`Audio could not play. Say ${SPOKEN_PRONUNCIATION}.`);
    };
    window.speechSynthesis.speak(utterance);
  };

  const playFullWord = () => {
    if (!AUDIO_SRC) {
      speak(SPOKEN_PRONUNCIATION, `pronunciation: ${SPOKEN_PRONUNCIATION}`);
      return;
    }

    const el = audioRef.current ?? new Audio(AUDIO_SRC);
    audioRef.current = el;
    el.currentTime = 0;
    el.onended = () => {
      setSpeaking(false);
      setStatus("Pronunciation finished.");
    };
    // A missing or blocked recording falls back to synthesis rather than going silent.
    const fallback = () => {
      setSpeaking(false);
      speak(SPOKEN_PRONUNCIATION, `pronunciation: ${SPOKEN_PRONUNCIATION}`);
    };
    el.onerror = fallback;
    setSpeaking(true);
    setStatus(`Playing pronunciation: ${SPOKEN_PRONUNCIATION}.`);
    void el.play().catch(fallback);
  };

  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-de-hairline bg-de-raised ${className}`}
      style={{ boxShadow: "0 24px 70px -42px rgba(123,108,255,0.8)" }}
      aria-label="How to pronounce Digerati"
      data-testid="digerati-pronunciation-card"
    >
      <div className="flex">
        {/* Entry rail, the way a dictionary column marks a headword. */}
        <div
          className="flex-none"
          style={{ width: 3, background: "rgb(var(--de-accent-rgb))" }}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <WordmarkMeter speaking={speaking} />
            <h2
              className="m-0 font-heading font-semibold text-white"
              style={{ fontSize: "clamp(1.5rem, 5.2vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              DIG<span className="font-normal text-white/40">·</span>ER
              <span className="font-normal text-white/40">·</span>
              <span
                className="text-de-accent-ink"
                style={{ borderBottom: "3px solid rgb(var(--de-accent-rgb))", paddingBottom: 2 }}
              >
                A
              </span>
              <span className="font-normal text-white/40">·</span>TI
            </h2>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-sm text-de-muted-soft">
              <span className="text-white/40">\</span> ˌdi-jə-ˈrä-tē{" "}
              <span className="text-white/40">\</span>
            </span>
            <span
              className="font-mono text-sm font-semibold text-de-accent-ink"
              style={{ letterSpacing: "0.04em" }}
            >
              {SPOKEN_PRONUNCIATION}
            </span>

            <button
              type="button"
              onClick={playFullWord}
              disabled={!canPlay}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-45"
              style={{ background: "rgb(var(--de-accent-rgb))" }}
              aria-label={`Play pronunciation: ${SPOKEN_PRONUNCIATION}`}
              data-testid="button-play-digerati-pronunciation"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              Hear it
            </button>
          </div>

          <p className="mt-5 border-t border-de-hairline pt-4 text-sm text-de-muted-soft">
            <span className="italic text-white/70">plural noun</span> &middot; a blend of{" "}
            <span className="italic text-white/80">digital</span> and{" "}
            <span className="italic text-white/80">literati</span>, in use since the early 1990s
          </p>

          <p className="mt-3 flex gap-3 leading-relaxed text-de-muted" style={{ fontSize: "0.95rem" }}>
            <span className="flex-none font-heading font-bold text-de-accent-ink">1</span>
            <span>
              People with deep expertise in computers and digital technology — the ones who actually
              know how the machinery works.
            </span>
          </p>

          <div className="mt-5 border-t border-de-hairline pt-4">
            <h3
              className="m-0 text-xs font-medium uppercase text-de-muted-soft"
              style={{ letterSpacing: "0.14em" }}
            >
              Tap a syllable to hear it
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {SYLLABLES.map((syl) => (
                <button
                  key={syl.label}
                  type="button"
                  onClick={() => speak(syl.say, `syllable ${syl.label}`)}
                  disabled={!hasSpeech}
                  className={`rounded-lg border px-3.5 py-2 text-left font-mono text-base font-semibold transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-45 ${
                    syl.stressed ? "text-de-accent-ink" : "text-white"
                  }`}
                  style={{
                    borderColor: syl.stressed
                      ? "rgb(var(--de-accent-rgb) / 0.5)"
                      : "var(--de-hairline)",
                    letterSpacing: "0.04em",
                  }}
                  aria-label={`Hear the syllable ${syl.label}${syl.stressed ? ", the stressed syllable" : ""}`}
                  data-testid={`button-syllable-${syl.say}`}
                >
                  {syl.label}
                  <span className="mt-1 block font-sans font-normal tracking-normal text-de-muted-soft" style={{ fontSize: "0.68rem" }}>
                    {syl.hint}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-de-muted-soft">
              Commonly heard: <b className="font-medium text-white/85">dye-ger-AH-tee</b>,{" "}
              <b className="font-medium text-white/85">dig-er-AT-ee</b>,{" "}
              <b className="font-medium text-white/85">dih-ger-AH-tie</b>. The <i>g</i> is soft, and
              the weight lands on the third syllable.
            </p>

            {!canPlay && (
              <p
                className="mt-2 text-xs text-de-muted-soft"
                data-testid="pronunciation-audio-unsupported"
              >
                Audio is not supported in this browser — use the sounded-out spelling above.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </aside>
  );
}

export default PronunciationCard;
