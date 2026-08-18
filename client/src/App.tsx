import { useState } from "react";
import { PITCHES, type UserCall } from "./game/pitches";
import { Intro } from "./screens/Intro";
import { PitchScreen } from "./screens/Pitch";
import { Results } from "./screens/Results";

type Stage = "intro" | "pitch" | "results";

export default function App() {
  const [stage, setStage] = useState<Stage>("intro");
  const [pitchIndex, setPitchIndex] = useState(0);
  const [calls, setCalls] = useState<UserCall[]>([]);

  const handleStart = () => {
    setStage("pitch");
    setPitchIndex(0);
    setCalls([]);
  };

  const handleCalled = (call: UserCall) => {
    const nextCalls = [...calls, call];
    setCalls(nextCalls);
    if (pitchIndex >= PITCHES.length - 1) {
      setStage("results");
      return;
    }
    setPitchIndex((current) => current + 1);
  };

  const handleReplay = () => {
    setStage("intro");
    setPitchIndex(0);
    setCalls([]);
  };

  return (
    <div className="flex min-h-dvh justify-center bg-black">
      <div className="relative isolate h-dvh w-full max-w-phone overflow-hidden bg-tm-ink">
        {stage === "intro" && <Intro onStart={handleStart} />}
        {stage === "pitch" && (
          <PitchScreen key={PITCHES[pitchIndex].id} pitchIndex={pitchIndex} onCalled={handleCalled} />
        )}
        {stage === "results" && <Results calls={calls} onReplay={handleReplay} />}
      </div>
    </div>
  );
}
