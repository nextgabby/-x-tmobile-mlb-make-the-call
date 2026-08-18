export function Baseball({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id="ballShade" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="70%" stopColor="#efe6d4" />
          <stop offset="100%" stopColor="#d9ccb3" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#ballShade)" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#c9b89a" strokeWidth="1.2" />
      <path
        d="M14 14c8 8 8 28 0 36"
        fill="none"
        stroke="#c8102e"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M50 14c-8 8-8 28 0 36"
        fill="none"
        stroke="#c8102e"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M16 18l3 2 M15 24l3.2 1.4 M15 30l3.4 0.4 M15.4 36l3.2-1 M17 42l2.8-1.8"
        stroke="#c8102e"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M48 18l-3 2 M49 24l-3.2 1.4 M49 30l-3.4 0.4 M48.6 36l-3.2-1 M47 42l-2.8-1.8"
        stroke="#c8102e"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}
