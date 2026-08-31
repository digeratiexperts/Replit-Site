import { useState } from "react";
import { Play, Volume2 } from "lucide-react";

const SPOKEN_PRONUNCIATION = "dij-uh-RAH-tee";

interface PronunciationCardProps {
  className?: string;
}

export function PronunciationCard({ className = "" }: PronunciationCardProps): JSX.Element {
  const [status, setStatus] = useState("Ready to play pronunciation.");

  const playPronunciation = () => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus("Audio pronunciation is not supported in this browser. Say dij-uh-RAH-tee.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(SPOKEN_PRONUNCIATION);
    utterance.lang = "en-US";
    utterance.rate = 0.78;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => setStatus("Playing pronunciation: dij-uh-RAH-tee.");
    utterance.onend = () => setStatus("Pronunciation finished.");
    utterance.onerror = () => setStatus("Audio could not play. Say dij-uh-RAH-tee.");
    window.speechSynthesis.speak(utterance);
  };

  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-white/15 bg-black/35 shadow-[0_24px_70px_-42px_rgba(123,108,255,0.8)] backdrop-blur-md ${className}`}
      aria-label="How to pronounce Digerati"
      data-testid="digerati-pronunciation-card"
    >
      <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-stretch">
        <div className="px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-heading text-[1.55rem] font-semibold tracking-[-0.035em] text-white">
              di·ger·a·ti
            </span>
            <span className="font-mono text-sm text-white/55">/ˌdɪdʒəˈrɑːti/</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[15px] font-semibold tracking-[0.04em] text-[#b9afff]">
              dij-uh-RAH-tee
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/42">
              Say it with confidence.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={playPronunciation}
          className="group flex min-h-14 items-center justify-center gap-2 border-t border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9a8bff] sm:min-w-28 sm:border-l sm:border-t-0"
          aria-label="Play pronunciation: dij-uh-RAH-tee"
          data-testid="button-play-digerati-pronunciation"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#9a8bff]/55 bg-[#7b6cff]/15 transition group-hover:bg-[#7b6cff]/25">
            <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Volume2 className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
            Hear it
          </span>
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </aside>
  );
}

export default PronunciationCard;
