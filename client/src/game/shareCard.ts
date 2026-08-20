import { rankFor, type UserCall } from "./pitches";

const MAGENTA = "#E20074";
const NAVY = "#0C2C56";
const WHITE = "#FFFFFF";
const SILVER = "#C4CED4";

export function drawShareCard(opts: {
  correct: number;
  total: number;
  edgeCorrect: number;
  edgeTotal: number;
  calls: UserCall[];
}): HTMLCanvasElement {
  const w = 1080;
  const h = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const rank = rankFor(opts.correct, opts.total);

  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = MAGENTA;
  ctx.fillRect(0, 0, w, 220);

  ctx.fillStyle = WHITE;
  ctx.font = "700 28px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MLB  ·  ABS", w / 2, 78);
  ctx.font = "800 92px 'Bebas Neue', Impact, sans-serif";
  ctx.fillText("PRESENTED BY T-MOBILE", w / 2, 168);

  ctx.fillStyle = SILVER;
  ctx.font = "700 28px 'DM Sans', sans-serif";
  ctx.fillText(rank.kicker.toUpperCase(), w / 2, 430);

  ctx.fillStyle = WHITE;
  ctx.font = "800 120px 'Bebas Neue', Impact, sans-serif";
  ctx.fillText("MAKE THE CALL", w / 2, 640);

  ctx.fillStyle = MAGENTA;
  ctx.font = "800 280px 'Bebas Neue', Impact, sans-serif";
  ctx.fillText(`${opts.correct}/${opts.total}`, w / 2, 980);

  ctx.fillStyle = WHITE;
  ctx.font = "800 86px 'Bebas Neue', Impact, sans-serif";
  ctx.fillText(rank.title.toUpperCase(), w / 2, 1100);

  ctx.fillStyle = SILVER;
  ctx.font = "600 32px 'DM Sans', sans-serif";
  wrapText(ctx, rank.body, w / 2, 1170, 820, 42);

  ctx.fillStyle = MAGENTA;
  ctx.font = "800 28px 'DM Sans', sans-serif";
  ctx.fillText("THAT'S THE POWER OF ABS", w / 2, 1320);

  roundRect(ctx, 140, 1380, 800, 160, 28);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fill();
  ctx.fillStyle = MAGENTA;
  ctx.font = "800 36px 'DM Sans', sans-serif";
  ctx.fillText("EDGE PITCHES", w / 2, 1440);
  ctx.fillStyle = WHITE;
  ctx.font = "800 56px 'Bebas Neue', Impact, sans-serif";
  ctx.fillText(`${opts.edgeCorrect}/${opts.edgeTotal}  MATCHED ABS`, w / 2, 1510);

  ctx.fillStyle = MAGENTA;
  ctx.fillRect(0, h - 140, w, 140);
  ctx.fillStyle = WHITE;
  ctx.font = "700 30px 'DM Sans', sans-serif";
  ctx.fillText("#MakeTheCall   ·   ABS Presented by T-Mobile", w / 2, h - 62);

  return canvas;
}

export async function canvasToPngFile(canvas: HTMLCanvasElement, name: string) {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("Could not export graphic");
  return new File([blob], name, { type: "image/png" });
}

export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadResults(opts: {
  correct: number;
  total: number;
  edgeCorrect: number;
  edgeTotal: number;
  calls: UserCall[];
}) {
  const canvas = drawShareCard(opts);
  const file = await canvasToPngFile(
    canvas,
    `make-the-call-${opts.correct}-of-${opts.total}.png`,
  );
  downloadFile(file);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
