import { motion } from "framer-motion";
import { HACKATHONS } from "../data/content";
import { Reveal } from "./shared";
import { viewportOnce } from "../animations/reveal";

export function Hackathons() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
      <Reveal>
        <p className="font-mono-tech text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#A3A3A3] border-b hairline pb-4 mb-10">
          <span className="text-[#FF1538]">/ HACKATHONS</span><span className="mx-2 text-[#3a3a3a]">—</span> PRESSURE BUILDS
        </p>
        <h2 className="display-giant text-[15vw] md:text-[8rem] leading-[0.86]">
          <span className="block text-white">BUILT</span>
          <span className="block text-white">UNDER</span>
          <span className="block text-[#FF1538]">PRESSURE.</span>
        </h2>
      </Reveal>
      <div className="mt-12 md:mt-16 border-t-2 border-white/90">
        {HACKATHONS.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline border-b hairline py-7 md:py-9 hover:bg-[#0b0b0b] transition-colors px-1 md:px-4"
          >
            <span className="md:col-span-1 font-mono-tech text-xs text-[#FF1538] tracking-[0.3em]">0{i + 1}</span>
            <h3 className="md:col-span-6 font-display text-2xl md:text-4xl uppercase text-white group-hover:translate-x-2 transition-transform duration-500">
              {h.name}
            </h3>
            <p className="md:col-span-2 font-mono-tech text-[11px] tracking-[0.2em] uppercase text-[#A3A3A3]">{h.role}</p>
            <p className="md:col-span-3 md:text-right">
              <span className="inline-block font-mono-tech text-[11px] tracking-[0.2em] uppercase border border-[#FF1538]/60 text-[#FF1538] px-3 py-1.5">{h.status}</span>
              <span className="block mt-2 font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#555]">{h.meta}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
