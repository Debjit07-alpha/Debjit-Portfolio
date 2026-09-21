export function Marquee() {
  const row = "REACT × NEXT.JS × TYPESCRIPT × NODE.JS × MONGODB × POSTGRESQL × AI × WEB × ";
  return (
    <div className="border-y hairline bg-[#0A0A0A] overflow-hidden" aria-hidden="true">
      <div className="animate-marquee-slow flex w-max whitespace-nowrap py-3">
        {[0, 1].map((k) => (
          <p key={k} className="font-display text-lg md:text-xl tracking-wider uppercase text-[#2b2b2b] pr-4">
            {row}
            <span className="text-[#FF1538]/60">{row}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
