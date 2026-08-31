import { useEffect, useState } from "react";
import { Play, Volume2 } from "lucide-react";

const AUDIO_SRC = "/audio/digerati-pronunciation.mp3";
// Gold is intentionally fixed to the DE wordmark bars; page accents must not recolor the logo mark.
const WORDMARK_GOLD = "#E7B20D";

const syllables = [
  { label: "dij", speech: "didge", hint: "like “didge”" },
  { label: "uh", speech: "uh", hint: "quick + soft" },
  { label: "RAH", speech: "rah", hint: "stress here" },
  { label: "tee", speech: "tee", hint: "letter T" },
] as const;

interface PronunciationCardProps {
  className?: string;
}

export function PronunciationCard({ className = "" }: PronunciationCardProps): JSX.Element {
  const [status, setStatus] = useState("Ready to play pronunciation.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [wideSyllables, setWideSyllables] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const sync = () => setWideSyllables(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const speak = (text: string, label: string) => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus(`Audio pronunciation is not supported in this browser. ${label}`);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.78;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => {
      setIsPlaying(true);
      setStatus(`Playing ${label}.`);
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setStatus(`${label} finished.`);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setStatus(`Audio could not play. ${label}`);
    };
    window.speechSynthesis.speak(utterance);
  };

  const playPronunciation = () => {
    window.speechSynthesis?.cancel();
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";
    audio.onplay = () => {
      setIsPlaying(true);
      setStatus("Playing canonical pronunciation: dij-uh-RAH-tee.");
    };
    audio.onended = () => {
      setIsPlaying(false);
      setStatus("Pronunciation finished.");
    };
    audio.onerror = () => {
      setIsPlaying(false);
      setStatus("Canonical pronunciation audio is unavailable.");
    };
    void audio.play().catch(() => {
      setIsPlaying(false);
      setStatus("Canonical pronunciation audio could not play.");
    });
  };

  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-de-hairline bg-de-raised ${className}`}
      style={{ boxShadow: "0 24px 70px -42px rgb(var(--de-accent-rgb) / 0.55)" }}
      aria-label="How to pronounce Digerati"
      data-testid="digerati-pronunciation-card"
    >
      <div className="px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline" style={{ columnGap: 12, rowGap: 4 }}>
              <span
                className="font-heading font-semibold text-white"
                style={{ fontSize: "1.65rem", letterSpacing: "-0.035em" }}
              >
                di·ger·<span className="text-de-accent-ink">a</span>·ti
              </span>
              <span className="text-xs font-semibold uppercase text-de-muted-soft" style={{ letterSpacing: "0.14em" }}>
                noun
              </span>
            </div>
            <p className="mt-1 text-sm text-de-muted-soft">The digital literati — people fluent in technology.</p>
          </div>

          <div className="flex items-end gap-1" aria-label="Digerati wordmark level meter" role="img">
            {[0.46, 0.72, 1, 0.64].map((scale, index) => (
              <span
                key={scale}
                aria-hidden="true"
                style={{
                  display: "block",
                  width: 3,
                  height: 22 + index * 3,
                  borderRadius: 999,
                  backgroundColor: WORDMARK_GOLD,
                  transformOrigin: "bottom",
                  transform: `scaleY(${isPlaying ? scale : 0.36})`,
                  transition: `transform 180ms ease ${index * 45}ms`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-2" aria-label="Pronunciation guide">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-bold text-de-accent-ink" aria-hidden="true">1</span>
            <span className="font-mono text-sm text-white/80">/ˌdɪdʒəˈrɑːti/</span>
            <span className="text-xs text-de-muted-soft">IPA</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold text-de-accent-ink" aria-hidden="true">2</span>
            <span className="font-mono font-semibold text-white" style={{ fontSize: 15, letterSpacing: "0.04em" }}>
              dij-uh-RAH-tee
            </span>
            <button
              type="button"
              onClick={playPronunciation}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-de-magenta px-4 text-sm font-semibold text-white transition hover:bg-de-magenta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ minHeight: 44 }}
              aria-label="Hear Digerati pronounced dij-uh-RAH-tee"
              data-testid="button-play-digerati-pronunciation"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
              Hear it
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-de-hairline pt-4">
          <p className="text-xs font-semibold uppercase text-de-muted-soft" style={{ letterSpacing: "0.12em" }}>
            Sound it out
          </p>
          <div
            className="mt-3 grid gap-2"
            style={{ gridTemplateColumns: wideSyllables ? "repeat(4,minmax(0,1fr))" : "repeat(2,minmax(0,1fr))" }}
          >
            {syllables.map((syllable) => (
              <button
                key={syllable.label}
                type="button"
                onClick={() => speak(syllable.speech, `syllable ${syllable.label}`)}
                className="rounded-lg border border-de-hairline bg-de-bg px-3 py-2 text-left transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ minHeight: 44 }}
                aria-label={`Hear syllable ${syllable.label}. ${syllable.hint}`}
              >
                <span className="block font-mono text-sm font-bold text-white">{syllable.label}</span>
                <span className="mt-0.5 block text-xs text-de-muted-soft">{syllable.hint}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-de-muted-soft">Tap a syllable to hear it.</p>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-de-hairline bg-de-bg px-3 py-2.5">
          <Volume2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-de-muted-soft" aria-hidden="true" />
          <p className="text-xs leading-5 text-de-muted-soft">
            <span className="font-semibold text-white/80">Commonly heard wrong:</span>{" "}
            stress drifting to <span className="font-mono text-white/80">GER</span> or <span className="font-mono text-white/80">TEE</span> instead of the third syllable.
          </p>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </aside>
  );
}

export default PronunciationCard;