import { FieldView } from "../components/FieldView";
import { PITCHES } from "../game/pitches";

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="screen-in relative flex h-full flex-col">
      <FieldView pitch={PITCHES[0]} phase="idle" />
      <div className="absolute inset-0 z-10 flex flex-col bg-gradient-to-b from-black/25 via-transparent to-black/85">
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
          <div className="rounded-3xl bg-black/50 px-5 py-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-tm-magenta-hot">
              MLB x T-Mobile ABS
            </p>
            <h1 className="title-outline mt-3 font-display text-[3.8rem] leading-[0.84]">
              Make
              <br />
              The Call
            </h1>
            <p className="mx-auto mt-4 max-w-[17.5rem] text-sm font-semibold leading-snug text-white/90">
              You’re in the slot this postseason. Five pitches. Ball or strike.
            </p>
          </div>
        </div>

        <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onStart}
            className="cta-pulse w-full rounded-full bg-tm-magenta py-4 font-display text-3xl tracking-wide text-white transition active:scale-[0.98]"
          >
            Step into the slot
          </button>
        </div>
      </div>
    </div>
  );
}
