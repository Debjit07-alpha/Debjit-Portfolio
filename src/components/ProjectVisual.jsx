import { motion } from "framer-motion";
import { viewportOnce } from "../animations/reveal";

/** Coded editorial mockups — abstract product UI, no fake screenshots. */
function Chrome({ url, children, tall = false, flush = false }) {
  return (
    <div className="border hairline bg-[#0A0A0A]">
      <div className="flex items-center gap-2 border-b hairline px-4 py-2.5">
        <span className="w-2 h-2 rounded-full bg-[#2a2a2a]" />
        <span className="w-2 h-2 rounded-full bg-[#2a2a2a]" />
        <span className="w-2 h-2 rounded-full bg-[#FF1538]" />
        <p className="ml-3 font-mono-tech text-[10px] tracking-[0.2em] text-[#6B6B6B] truncate uppercase">{url}</p>
      </div>
      {flush ? (
        <div>{children}</div>
      ) : (
      <div className={tall ? "p-5 md:p-8 min-h-[320px] md:min-h-[420px]" : "p-5 md:p-7 min-h-[260px] md:min-h-[320px]"}>
        {children}
      </div>
      )}
    </div>
  );
}

export function ProjectVisual({ mock, image, title }) {
  if (image) {
    return (
      <Chrome url={`${title || mock} — showcase`} flush>
        <img
          src={image}
          alt={`${title || "Project"} showcase banner`}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto aspect-video object-cover bg-[#111]"
        />
      </Chrome>
    );
  }
  if (mock === "medikios") {
    return (
      <Chrome url="medikios — patient workflow" tall>
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-4 border hairline p-4 hidden sm:block">
            <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#FF1538] uppercase">Queue</p>
            {["TK-014 — IN CONSULT", "TK-015 — VITALS", "TK-016 — WAITING"].map((t, i) => (
              <div key={t} className={`mt-3 border px-3 py-2.5 font-mono-tech text-[10px] tracking-widest ${i === 0 ? "border-[#FF1538]/60 bg-[#FF1538]/10 text-white" : "hairline text-[#A3A3A3]"}`}>
                {t}
              </div>
            ))}
            <div className="mt-4 h-16 border hairline bg-[repeating-linear-gradient(90deg,#1a1a1a_0_6px,transparent_6px_12px)]" />
          </div>
          <div className="col-span-12 sm:col-span-8 border hairline p-4 md:p-6 relative overflow-hidden">
            <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#6B6B6B] uppercase">AI pre-consult — EN / HI / BN</p>
            <p className="font-display text-3xl md:text-5xl mt-3 uppercase text-white">Patient<br />Intake</p>
            <div className="mt-5 flex gap-2">
              {["VOICE", "TOUCH", "OCR"].map((c) => (
                <span key={c} className="font-mono-tech text-[10px] tracking-[0.2em] border border-[#FF1538]/50 text-[#FF1538] px-3 py-1.5">{c}</span>
              ))}
            </div>
            <div className="absolute -right-8 -bottom-10 w-48 h-48 rounded-full bg-[#FF1538]/20 blur-3xl" />
            <div className="mt-6 h-2 w-3/4 bg-[#1e1e1e]"><div className="h-full w-2/3 bg-[#FF1538]" /></div>
          </div>
        </div>
      </Chrome>
    );
  }
  if (mock === "tastybites") {
    return (
      <Chrome url="tastybites — ordering console">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <p className="font-display text-2xl md:text-4xl uppercase text-white">Menu <span className="text-[#FF1538]">/ Live</span></p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["BUTTER CHICKEN — ₹249", "BIRYANI — ₹199", "MASALA DOSA — ₹129", "PANEER TIKKA — ₹179"].map((m) => (
                <div key={m} className="border hairline p-3">
                  <div className="h-10 bg-[#161616] border hairline mb-2" />
                  <p className="font-mono-tech text-[9px] tracking-widest text-[#A3A3A3]">{m}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-5 border hairline p-4 bg-[#0d0d0d]">
            <p className="font-mono-tech text-[10px] tracking-[0.25em] text-white uppercase">Cart — 3 items</p>
            <div className="mt-3 space-y-2">
              {[70, 45, 85].map((w, i) => (
                <div key={i} className="h-2 bg-[#1e1e1e]"><div className="h-full bg-white/70" style={{ width: `${w}%` }} /></div>
              ))}
            </div>
            <p className="mt-3 font-mono-tech text-[10px] text-[#FF1538] tracking-widest">COUPON: WELCOME20 ✓</p>
            <p className="mt-1 font-mono-tech text-[10px] text-[#6B6B6B] tracking-widest">DINE-IN QR · RESERVATIONS · ADMIN</p>
            <div className="mt-4 bg-[#FF1538] text-white text-center font-mono-tech text-[10px] tracking-[0.25em] py-2.5">PLACE ORDER →</div>
          </div>
        </div>
      </Chrome>
    );
  }
  if (mock === "water") {
    return (
      <Chrome url="water-borne diseases — risk overview" tall>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 border hairline p-4">
            <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#6B6B6B] uppercase">Risk map — districts</p>
            <div className="mt-3 grid grid-cols-6 gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-8 border hairline" style={{ background: i % 7 === 0 ? "rgba(255,21,56,0.55)" : i % 3 === 0 ? "rgba(255,21,56,0.18)" : "#111" }} />
              ))}
            </div>
            <div className="mt-4 flex items-end gap-1.5 h-20">
              {[35, 55, 40, 70, 52, 88, 64, 95, 58, 74, 46, 66].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="flex-1 origin-bottom"
                  style={{ height: `${h}%`, background: i === 7 ? "#FF1538" : "#262626" }}
                />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 space-y-4">
            {[["WATER QUALITY INDEX", "6.8 / MODERATE", "#F5F5F5"], ["OUTBREAK RISK", "HIGH — ZONE 4", "#FF1538"], ["TREND", "+12% / 30 DAYS", "#A3A3A3"]].map(([k, v, c]) => (
              <div key={k} className="border hairline p-4">
                <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#6B6B6B]">{k}</p>
                <p className="font-display text-xl md:text-2xl mt-1" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Chrome>
    );
  }
  if (mock === "repomcp") {
    return (
      <div className="border hairline bg-[#0A0A0A] p-5 md:p-8">
        <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#6B6B6B] uppercase mb-6">repo-mcp — retrieval pipeline</p>
        <div className="flex flex-col gap-0 max-w-xl">
          {["GITHUB REPOSITORY", "DOCUMENT INGESTION", "EMBEDDINGS", "VECTOR / DATABASE STORAGE", "SEMANTIC SEARCH", "LLM", "ANSWER"].map((s, i, arr) => (
            <div key={s}>
              <div className={`border px-4 py-3 font-mono-tech text-[11px] tracking-[0.2em] flex items-center justify-between ${i === arr.length - 1 ? "border-[#FF1538] text-white bg-[#FF1538]/10" : "hairline text-[#A3A3A3]"}`}>
                <span><span className="text-[#FF1538] mr-3">0{i + 1}</span>{s}</span>
                {i === arr.length - 1 && <span className="text-[#FF1538]">◉</span>}
              </div>
              {i < arr.length - 1 && <div className="w-px h-4 bg-[#FF1538]/60 mx-8" />}
            </div>
          ))}
        </div>
        <div className="mt-6 border hairline p-4 font-mono-tech text-[11px] text-[#A3A3A3]">
          <span className="text-[#FF1538]">Q&gt;</span> how does auth work in this repo? <span className="text-[#3a3a3a]">— semantic hit · 0.87</span>
        </div>
      </div>
    );
  }
  // fridge
  return (
    <Chrome url="smart fridge — ai chef console">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 border hairline p-4">
          <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#6B6B6B] uppercase">Fridge scan</p>
          <div className="mt-3 h-32 bg-[linear-gradient(180deg,#141414,#080808)] border hairline relative overflow-hidden">
            <div className="absolute inset-x-4 top-1/2 h-px bg-[#FF1538]" />
            <div className="absolute inset-4 border border-dashed border-[#333]" />
            <p className="absolute bottom-2 left-2 font-mono-tech text-[9px] text-[#FF1538] tracking-widest">SCANNING… 82%</p>
          </div>
          <p className="mt-2 font-mono-tech text-[9px] text-[#A3A3A3] tracking-widest">MILK — EXPIRES IN 2D · SPINACH — 5D</p>
        </div>
        <div className="col-span-7 border hairline p-4">
          <p className="font-mono-tech text-[10px] tracking-[0.25em] text-[#FF1538] uppercase">AI chef suggests</p>
          <p className="font-display text-xl md:text-3xl uppercase text-white mt-2">Palak Paneer +<br />Jeera Rice</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["KCAL 540", "PROTEIN 22G", "15 MIN"].map((t) => (
              <span key={t} className="font-mono-tech text-[9px] tracking-widest border hairline px-2.5 py-1.5 text-[#A3A3A3]">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}
