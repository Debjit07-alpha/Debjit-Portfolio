import { motion } from "framer-motion";
import { TECHNOLOGIES } from "../data/content";
import { SectionLabel, Reveal } from "./shared";
import { viewportOnce } from "../animations/reveal";

export function Technology() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
      <SectionLabel index="04" title="TECHNOLOGY" right="NO FAKE % — JUST TOOLS" />
      <Reveal>
        <h2 className="display-giant text-[14vw] md:text-[7.5rem] leading-[0.86]">
          <span className="block text-white">TOOLS</span>
          <span className="block text-white">I WORK <span className="text-stroke-red">WITH.</span></span>
        </h2>
      </Reveal>
      <div className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l hairline">
        {TECHNOLOGIES.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            className="group border-b border-r hairline px-5 py-5 md:px-6 md:py-7 hover:bg-[#FF1538] transition-colors duration-300"
          >
            <p className="font-mono-tech text-[9px] tracking-[0.3em] text-[#FF1538] group-hover:text-black/70 uppercase">
              {String(i + 1).padStart(2, "0")} — {t.tag}
            </p>
            <p className="mt-2 font-body font-semibold text-base md:text-lg text-white group-hover:text-black">
              {t.name}
            </p>
          </motion.div>
        ))}
        <div className="border-b border-r hairline px-5 py-5 md:px-6 md:py-7 bg-[#0A0A0A] col-span-2 sm:col-span-1 lg:col-span-1">
          <p className="font-mono-tech text-[9px] tracking-[0.3em] text-[#6B6B6B] uppercase">+ More</p>
          <p className="mt-2 text-sm text-[#A3A3A3]">Learning weekly. Shipping always.</p>
        </div>
      </div>
    </section>
  );
}
