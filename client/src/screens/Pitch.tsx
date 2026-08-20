import { useEffect, useRef, useState } from "react";
import { FieldView, type Phase } from "../components/FieldView";
import { ProgressPips } from "../components/ProgressPips";
import {
  PITCHES,
  countAfter,
  formatCount,
  type Pitch,
  type UserCall,
} from "../game/pitches";

const FIRST_CUE_MS = 2000;
const WINDUP_MS = 250;
const INCOMING_MS = 2150;
const DECIDE_MS = 2350;

export function PitchScreen({
  pitchIndex,
  onCalled,
}: {
  pitchIndex: number;
  onCalled: (call: UserCall) => void;
}) {
  const pitch = PITCHES[pitchIndex];
  const [phase, setPhase] = useState<Phase>("idle");
  const [userCall, setUserCall] = useState<UserCall | null>(null);
  const locked = useRef(false);
  const userCallRef = useRef<UserCall | null>(null);
  const onCalledRef = useRef(onCalled);
  onCalledRef.current = onCalled;

  useEffect(() => {
    locked.current = false;
    setPhase("idle");
    setUserCall(null);
    userCallRef.current = null;
    const isFirst = pitch.index === 1;
    const windup = isFirst ? FIRST_CUE_MS : WINDUP_MS;
    const toIncoming = window.setTimeout(() => setPhase("incoming"), windup);
    const toDecide = window.setTimeout(() => setPhase("decide"), windup + INCOMING_MS);
    return () => {
      window.clearTimeout(toIncoming);
      window.clearTimeout(toDecide);
    };
  }, [pitch.id]);

  const commit = (call: UserCall) => {
    if (locked.current) return;
    locked.current = true;
    userCallRef.current = call;
    setUserCall(call);
    setPhase("reveal");
  };

  useEffect(() => {
    if (phase !== "decide") return;
    const miss = window.setTimeout(() => commit("none"), DECIDE_MS);
    return () => window.clearTimeout(miss);
  }, [phase, pitch.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (phase === "decide") {
        if (event.key === "b" || event.key === "B" || event.key === "ArrowLeft") {
          event.preventDefault();
          commit("ball");
        }
        if (event.key === "s" || event.key === "S" || event.key === "ArrowRight") {
          event.preventDefault();
          commit("strike");
        }
      }
      if (phase === "reveal" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onCalledRef.current(userCallRef.current ?? "none");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const matched = userCall === pitch.absCall;
  const after = countAfter(pitch);
  const isLast = pitchIndex >= PITCHES.length - 1;

  return (
    <div className="relative flex h-full flex-col">
      <FieldView
        pitch={pitch}
        phase={phase}
        absCall={phase === "reveal" ? pitch.absCall : undefined}
        atmosphere={phase === "reveal" ? "close" : phase === "decide" ? "zone" : "incoming"}
      />

      {phase === "idle" && pitch.index === 1 && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
          <p className="title-outline text-center font-display text-5xl leading-[0.9]">
            Here it
            <br />
            comes
          </p>
        </div>
      )}

      <div className="relative z-20 mt-auto bg-gradient-to-t from-black from-40% via-black/80 to-transparent px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10">
        {phase === "reveal" && userCall !== null && (
          <RevealCopy pitch={pitch} userCall={userCall} matched={matched} after={after} />
        )}

        <ProgressPips total={PITCHES.length} current={pitchIndex} />

        <p className="mt-3 text-center text-xs font-extrabold uppercase tracking-[0.18em] text-white">
          Pitch {pitch.index} of {PITCHES.length} · {pitch.pitch} {pitch.mph}
        </p>

        {(phase === "incoming" || phase === "decide" || phase === "idle") && (
          <p className="mt-2 text-center text-sm font-semibold text-white/90">
            {pitch.blurb}
          </p>
        )}

        {phase === "decide" && (
          <div className="mt-3">
            <div className="h-1 overflow-hidden rounded-full bg-white/20">
              <div className="timer-bar h-full bg-tm-magenta" />
            </div>
            <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              Make the call
            </p>
          </div>
        )}

        {phase === "decide" && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => commit("ball")}
              className="rounded-full border-2 border-white bg-sea-navy py-3.5 font-display text-3xl tracking-wide text-white transition active:scale-[0.98]"
            >
              Ball
            </button>
            <button
              type="button"
              onClick={() => commit("strike")}
              className="rounded-full bg-tm-magenta py-3.5 font-display text-3xl tracking-wide text-white transition active:scale-[0.98]"
            >
              Strike
            </button>
          </div>
        )}

        {phase === "reveal" && (
          <button
            type="button"
            onClick={() => onCalled(userCall ?? "none")}
            className="mt-3 w-full rounded-full bg-tm-magenta py-4 font-display text-2xl tracking-wide text-white transition active:scale-[0.98]"
          >
            {isLast ? "See your card" : "Next pitch"}
          </button>
        )}
      </div>
    </div>
  );
}

function RevealCopy({
  pitch,
  userCall,
  matched,
  after,
}: {
  pitch: Pitch;
  userCall: UserCall;
  matched: boolean;
  after: { balls: number; strikes: number };
}) {
  const you =
    userCall === "none" ? "No call" : userCall === "strike" ? "You: Strike" : "You: Ball";

  return (
    <div className="call-pop mb-3 rounded-2xl bg-white px-4 py-3 text-center">
      <p className="font-display text-3xl leading-none tracking-wide text-black">
        {matched ? "You matched ABS" : "ABS saw it differently"}
      </p>
      <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-black/55">
        Call confirmed · Count {formatCount(after)}
      </p>
      <p className="mt-0.5 text-xs font-bold text-black/50">
        {you} · ABS: {pitch.absCall.toUpperCase()}
      </p>
    </div>
  );
}
