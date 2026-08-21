import type { CSSProperties } from "react";
import { Baseball } from "./Baseball";
import { AbsBadge, CallPill } from "./Brand";
import { Stadium } from "./Stadium";
import type { Call, Pitch } from "../game/pitches";

export type Phase = "idle" | "incoming" | "decide" | "reveal";

export function FieldView({
  pitch,
  phase,
  absCall,
  atmosphere = "incoming",
}: {
  pitch: Pitch;
  phase: Phase;
  absCall?: Call;
  atmosphere?: "incoming" | "zone" | "close";
}) {
  const photo =
    atmosphere === "close"
      ? "/field/close.png"
      : atmosphere === "zone"
        ? "/field/zone.png"
        : "/field/incoming.png";

  return (
    <div className={`absolute inset-0 overflow-hidden ${phase === "reveal" ? "field-zoom" : ""}`}>
      <img
        src={photo}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover object-bottom opacity-55 blur-[18px] saturate-[1.15]"
      />
      <Stadium />
      <div className="grain" />
      <div className="vignette" />

      <div
        className={`zone ${phase === "decide" ? "zone-pulse" : ""}`}
        style={
          {
            "--bx": `${pitch.loc.x * 100}%`,
            "--by": `${pitch.loc.y * 100}%`,
          } as CSSProperties
        }
      >
        {phase === "incoming" && (
          <div key={`${pitch.id}-in`} className="ball ball-incoming">
            <Baseball className="h-full w-full" />
          </div>
        )}
        {phase === "reveal" && (
          <div key={`${pitch.id}-reveal`} className="ball ball-reveal">
            <Baseball className="h-full w-full" />
          </div>
        )}
        {phase === "reveal" && absCall && <span className="abs-dot" />}
      </div>

      <div className="absolute right-3 top-[max(0.65rem,env(safe-area-inset-top))] z-20 flex flex-col items-end gap-2">
        <AbsBadge />
        {phase === "reveal" && absCall && (
          <div className="call-pop">
            <CallPill call={absCall} />
          </div>
        )}
      </div>
    </div>
  );
}
