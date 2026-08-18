/** Umpire POV of T-Mobile Park — painted so baked-in logos from stills never leak. */
export function Stadium() {
  return (
    <svg
      viewBox="0 0 400 720"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2330" />
          <stop offset="55%" stopColor="#243044" />
          <stop offset="100%" stopColor="#2c3a2a" />
        </linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a8a3e" />
          <stop offset="100%" stopColor="#2f6a32" />
        </linearGradient>
        <linearGradient id="dirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b0794c" />
          <stop offset="100%" stopColor="#8a5534" />
        </linearGradient>
        <radialGradient id="bowl" cx="50%" cy="18%" r="80%">
          <stop offset="0%" stopColor="#3a4658" />
          <stop offset="100%" stopColor="#121820" />
        </radialGradient>
      </defs>

      <rect width="400" height="720" fill="url(#sky)" />

      <ellipse cx="200" cy="210" rx="260" ry="170" fill="url(#bowl)" />
      <path d="M-20 250 Q200 80 420 250 L420 420 L-20 420 Z" fill="#15202c" />
      <path d="M10 255 Q200 110 390 255 L380 330 Q200 210 20 330 Z" fill="#0e3a38" opacity="0.85" />
      <path d="M40 300 Q200 190 360 300 L350 355 Q200 265 50 355 Z" fill="#163a36" />

      <rect x="118" y="118" width="164" height="52" rx="4" fill="#0b1218" />
      <rect x="124" y="124" width="152" height="40" rx="2" fill="#152230" />
      <text
        x="200"
        y="150"
        textAnchor="middle"
        fill="#C4CED4"
        fontFamily="Bebas Neue, Impact, sans-serif"
        fontSize="16"
        letterSpacing="1.4"
      >
        T-MOBILE PARK
      </text>

      <g className="lights">
        <circle cx="70" cy="168" r="7" fill="#fff6d4" opacity="0.9" />
        <circle cx="330" cy="168" r="7" fill="#fff6d4" opacity="0.9" />
        <circle cx="48" cy="210" r="5" fill="#fff6d4" opacity="0.7" />
        <circle cx="352" cy="210" r="5" fill="#fff6d4" opacity="0.7" />
      </g>

      <polygon points="0,720 400,720 292,210 108,210" fill="url(#grass)" />
      <polygon points="18,720 382,720 268,248 132,248" fill="#3f7d38" />

      <ellipse cx="200" cy="268" rx="22" ry="10" fill="#9a6842" />
      <ellipse cx="200" cy="266" rx="10" ry="5" fill="#7a5134" />

      <polygon points="55,720 345,720 255,330 145,330" fill="url(#dirt)" />
      <polygon points="78,720 322,720 248,390 152,390" fill="#a06c45" />

      <path d="M200 390 L132 720" stroke="#f4f1ea" strokeWidth="2.2" opacity="0.85" />
      <path d="M200 390 L268 720" stroke="#f4f1ea" strokeWidth="2.2" opacity="0.85" />

      <polygon points="92,575 175,575 168,720 72,720" fill="none" stroke="#f4f1ea" strokeWidth="2.4" />
      <polygon points="225,575 308,575 328,720 232,720" fill="none" stroke="#f4f1ea" strokeWidth="2.4" />

      <polygon points="200,612 168,648 200,678 232,648" fill="#f4f1ea" />
      <polygon points="200,622 178,646 200,666 222,646" fill="#e8e2d6" />

      <path
        d="M168 430 Q200 500 232 430"
        fill="none"
        stroke="#3a2318"
        strokeWidth="10"
        opacity="0.18"
        strokeLinecap="round"
      />
    </svg>
  );
}
