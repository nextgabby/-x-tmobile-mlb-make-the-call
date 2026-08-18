export function ProgressPips({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i === current
              ? "w-5 bg-tm-magenta"
              : i < current
                ? "w-1.5 bg-white"
                : "w-1.5 bg-white/25"
          }`}
        />
      ))}
    </div>
  );
}
