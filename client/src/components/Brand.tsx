export function AbsBadge({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/abs-lockup.png"
      alt="ABS Presented by T-Mobile"
      className={`rounded-md object-cover shadow-lg ${className || "h-[4.75rem] w-[4.75rem]"}`}
    />
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
