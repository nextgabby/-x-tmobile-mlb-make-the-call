# Make The Call · MLB ABS × T-Mobile

X-native gamified microsite. Fans step into the umpire’s slot at T-Mobile Park, call five pitches ball or strike, then download a branded accuracy card.

Seattle Mariners are the sample home club — T-Mobile Park is their stadium.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

## Deploy to Vercel

Vercel should serve the **static client**, not the Node server. This repo includes `vercel.json`:

- **Build:** `npx vite build`
- **Output:** `dist/public`

If the GitHub repo is `gw-demos`, set **Root Directory** to `x-tmobile-mlb-make-the-call`.

## Deploy to Render

1. Push this folder as a GitHub repo (or the `x-tmobile-mlb-make-the-call` path as the root).
2. Create a **Web Service** on Render, Node runtime.
3. Render will pick up `render.yaml`.

`PORT` is set by Render. Health check: `GET /health`.

## Flow

1. **The Slot** — landing at T-Mobile Park, umpire POV.
2. **Five pitches** — incoming heat, a 1.3s Ball/Strike window, then the ABS reveal.
3. **Your card** — accuracy + edge-pitch breakdown, then download a 9:16 graphic.

Pitch 1–2 are readable. Pitches 3–5 live on the black — that’s the ABS story. Ground truth lives in `client/src/game/pitches.ts` (`videoSrc` can be added later).
# -x-tmobile-mlb-make-the-call
