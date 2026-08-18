export type Call = "ball" | "strike";
export type UserCall = Call | "none";
export type PitchKind = "warmup" | "edge";

export type Pitch = {
  id: string;
  index: number;
  pitcher: string;
  pitch: string;
  mph: number;
  kind: PitchKind;
  blurb: string;
  absCall: Call;
  /** Strike zone coords. 0–1 is inside the zone; values outside mean off the plate. */
  loc: { x: number; y: number };
  countBefore: { balls: number; strikes: number };
  /** Optional real clip. When set, FieldView can swap the CSS pitch for video. */
  videoSrc?: string;
};

export const PITCHES: Pitch[] = [
  {
    id: "middle-heat",
    index: 1,
    pitcher: "Castillo",
    pitch: "Four-seam",
    mph: 96,
    kind: "warmup",
    blurb: "Middle-middle. Trust what you see.",
    absCall: "strike",
    loc: { x: 0.5, y: 0.48 },
    countBefore: { balls: 0, strikes: 0 },
  },
  {
    id: "slider-away",
    index: 2,
    pitcher: "Castillo",
    pitch: "Slider",
    mph: 84,
    kind: "warmup",
    blurb: "Bounces off the plate. Don’t chase.",
    absCall: "ball",
    loc: { x: 1.42, y: 0.62 },
    countBefore: { balls: 0, strikes: 1 },
  },
  {
    id: "nick-black",
    index: 3,
    pitcher: "Castillo",
    pitch: "Two-seam",
    mph: 93,
    kind: "edge",
    blurb: "Does it nick the black?",
    absCall: "strike",
    loc: { x: 0.03, y: 0.9 },
    countBefore: { balls: 1, strikes: 1 },
  },
  {
    id: "off-corner",
    index: 4,
    pitcher: "Castillo",
    pitch: "Curve",
    mph: 79,
    kind: "edge",
    blurb: "Looks like a strike from the slot.",
    absCall: "ball",
    loc: { x: 1.1, y: 0.52 },
    countBefore: { balls: 1, strikes: 2 },
  },
  {
    id: "high-heat",
    index: 5,
    pitcher: "Castillo",
    pitch: "Four-seam",
    mph: 98,
    kind: "edge",
    blurb: "Up in the zone — or above it?",
    absCall: "strike",
    loc: { x: 0.54, y: 0.05 },
    countBefore: { balls: 2, strikes: 2 },
  },
];

export function countAfter(pitch: Pitch): { balls: number; strikes: number } {
  const next = { ...pitch.countBefore };
  if (pitch.absCall === "ball") next.balls += 1;
  else next.strikes += 1;
  return next;
}

export function formatCount(count: { balls: number; strikes: number }) {
  return `${count.balls}–${count.strikes}`;
}

export type Rank = {
  title: string;
  kicker: string;
  body: string;
};

export function rankFor(correct: number, total: number): Rank {
  const pct = correct / total;
  if (pct === 1) {
    return {
      title: "ABS Certified",
      kicker: "Perfect set",
      body: "You saw what the machine saw. That’s a rare look from the slot.",
    };
  }
  if (correct >= 4) {
    return {
      title: "In the Slot",
      kicker: "Umpire eyes",
      body: "You belong back there. ABS still had the last word on the edges.",
    };
  }
  if (correct >= 3) {
    return {
      title: "Challenge Pending",
      kicker: "Close, not locked",
      body: "The heart of the plate was yours. The corners belong to ABS.",
    };
  }
  if (correct >= 1) {
    return {
      title: "Human Eye",
      kicker: "That’s why ABS exists",
      body: "From the slot, the edges lie. The system doesn’t blink.",
    };
  }
  return {
    title: "Needs Replay",
    kicker: "Rough inning",
    body: "Five pitches. Five different looks. ABS was undefeated.",
  };
}

export function scoreCalls(calls: UserCall[]) {
  const correct = PITCHES.reduce((sum, pitch, i) => {
    return sum + (calls[i] === pitch.absCall ? 1 : 0);
  }, 0);
  const edgePitches = PITCHES.filter((p) => p.kind === "edge");
  const edgeCorrect = edgePitches.reduce((sum, pitch) => {
    const i = PITCHES.findIndex((p) => p.id === pitch.id);
    return sum + (calls[i] === pitch.absCall ? 1 : 0);
  }, 0);
  return {
    correct,
    total: PITCHES.length,
    edgeCorrect,
    edgeTotal: edgePitches.length,
  };
}

export function shareCopy(correct: number, total: number, rank: Rank) {
  return `I went ${correct}/${total} in the slot at T-Mobile Park. ${rank.title}. ABS still saw the ones I missed. #MakeTheCall`;
}
