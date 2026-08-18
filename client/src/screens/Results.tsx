import { useState } from "react";
import { AbsBadge, MarinersMark } from "../components/Brand";
import {
  PITCHES,
  rankFor,
  scoreCalls,
  type UserCall,
} from "../game/pitches";
import { downloadResults } from "../game/shareCard";

export function Results({
  calls,
  onReplay,
}: {
  calls: UserCall[];
  onReplay: () => void;
}) {
  const score = scoreCalls(calls);
  const rank = rankFor(score.correct, score.total);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const payload = { ...score, calls };

  const handleDownload = async () => {
    setBusy(true);
    setNote(null);
    try {
      await downloadResults(payload);
      setNote("Graphic saved to your downloads.");
    } catch {
      setNote("Could not save the graphic.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="screen-in relative flex h-full flex-col overflow-hidden bg-sea-navy">
      <div className="absolute inset-x-0 top-0 h-28 bg-tm-magenta" />
      <div className="relative z-10 flex items-start justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <MarinersMark className="h-11 w-11" />
        <AbsBadge />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-3 pt-5 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-sea-silver">
          {rank.kicker} · T-Mobile Park
        </p>
        <p className="win-burst mt-1 font-display text-[5.5rem] leading-none text-white">
          {score.correct}/{score.total}
        </p>
        <h2 className="mt-1 font-display text-4xl leading-none text-tm-magenta-hot">{rank.title}</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm font-semibold text-white/80">{rank.body}</p>

        <div className="mt-4 w-full rounded-2xl bg-white/10 px-4 py-3">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-tm-magenta-hot">
            Edge pitches · {score.edgeCorrect}/{score.edgeTotal} matched ABS
          </p>
          <ul className="mt-3 space-y-2 text-left">
            {PITCHES.map((pitch, i) => {
              const call = calls[i];
              const hit = call === pitch.absCall;
              return (
                <li key={pitch.id} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-white/85">
                    {pitch.index}. {pitch.pitch} {pitch.mph}
                    {pitch.kind === "edge" ? " · edge" : ""}
                  </span>
                  <span
                    className={`font-display text-lg leading-none ${
                      hit ? "text-white" : "text-tm-magenta-hot"
                    }`}
                  >
                    {hit ? "Match" : call === "none" ? "Late" : "Miss"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        {note && <p className="mt-3 text-xs font-semibold text-sea-silver">{note}</p>}
      </div>

      <div className="relative z-10 flex flex-col gap-2.5 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={handleDownload}
          disabled={busy}
          className="cta-pulse w-full rounded-full bg-tm-magenta py-4 font-display text-2xl tracking-wide text-white disabled:opacity-70"
        >
          {busy ? "Saving…" : "Download graphic"}
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="w-full py-1 font-display text-lg tracking-wide text-sea-silver"
        >
          Call another set
        </button>
      </div>
    </div>
  );
}
