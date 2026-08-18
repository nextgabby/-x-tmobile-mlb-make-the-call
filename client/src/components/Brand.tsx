export function MarinersMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Seattle Mariners">
      <circle cx="32" cy="32" r="31" fill="#0C2C56" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#C4CED4" strokeWidth="2.2" />
      <circle cx="32" cy="32" r="22" fill="#005C5C" />
      <path
        d="M32 8 L35 24 L32 22 L29 24 Z M56 32 L40 35 L42 32 L40 29 Z M32 56 L29 40 L32 42 L35 40 Z M8 32 L24 29 L22 32 L24 35 Z"
        fill="#E20074"
      />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Bebas Neue, Impact, sans-serif"
        fontSize="28"
      >
        S
      </text>
    </svg>
  );
}

export function AbsBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-[5.25rem] flex-col items-center rounded-md bg-tm-magenta px-2 pb-2 pt-1.5 text-center text-white shadow-lg ${className}`}
    >
      <svg viewBox="0 0 32 20" className="mb-0.5 h-4 w-7" aria-hidden>
        <path
          d="M8 18c1-6 4-10 8-14 3 3 5 8 5 14"
          fill="none"
          stroke="white"
          strokeWidth="1.6"
        />
        <circle cx="22" cy="6" r="2.2" fill="white" />
        <path d="M14 18h12" stroke="white" strokeWidth="1.4" />
      </svg>
      <p className="font-display text-[1.55rem] leading-none tracking-wide">ABS</p>
      <p className="mt-0.5 text-[8px] font-extrabold uppercase leading-tight tracking-[0.08em]">
        Powered by
        <br />
        T-Mobile
      </p>
    </div>
  );
}

export function CallPill({ call }: { call: "ball" | "strike" }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-lg">
      <span className="h-2.5 w-2.5 rounded-full bg-tm-magenta" />
      <span className="font-display text-2xl leading-none tracking-wide text-black">
        {call.toUpperCase()}
      </span>
    </div>
  );
}
