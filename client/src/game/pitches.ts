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
    id: "slider-away",
    index: 1,
    pitcher: "Castillo",
    pitch: "Slider",
    mph: 84,
    kind: "warmup",
    blurb: "Bounces off the plate. Don’t chase.",
    absCall: "ball",
    loc: { x: 1.42, y: 0.68 },
    countBefore: { balls: 0, strikes: 0 },
  },
  {
    id: "middle-heat",
    index: 2,
    pitcher: "Castillo",
    pitch: "Four-seam",
    mph: 96,
    kind: "warmup",
    blurb: "Middle-middle. Trust what you see.",
    absCall: "strike",
    loc: { x: 0.5, y: 0.48 },
    countBefore: { balls: 1, strikes: 0 },
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

export function rankFor(correct: number, _total: number): Rank {
  if (correct >= 5) {
    return {
      title: "90–100%",
      kicker: "Very Accurate",
      body: "You ABSolutely crushed those calls.",
    };
  }
  if (correct === 4) {
    return {
      title: "70–89%",
      kicker: "Accurate",
      body: "Just like 5G, you had a strong connection with the plate.",
    };
  }
  if (correct === 3) {
    return {
      title: "50–69%",
      kicker: "Moderately Accurate",
      body: "Even with a strong connection, you made some tough calls.",
    };
  }
  if (correct === 2) {
    return {
      title: "30–49%",
      kicker: "Somewhat Accurate",
      body: "You struggled to find coverage of the plate.",
    };
  }
  if (correct === 1) {
    return {
      title: "1–29%",
      kicker: "Not Very Accurate",
      body: "Some calls can be...challenging.",
    };
  }
  return {
    title: "Rough Inning",
    kicker: "Tough Calls",
    body: "You'll get 'em next time.",
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
