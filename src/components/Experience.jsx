import { motion } from "framer-motion";
import { EXPERIENCE } from "../data/content";
import { SectionLabel, Reveal } from "./shared";
import { viewportOnce } from "../animations/reveal";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-t hairline bg-[#070707] scroll-mt-16">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
        <SectionLabel index="05" title="EXPERIENCE" right="KOLKATA — IN" />
        {/* Desktop visual — right-side layer inside the container, headline overlaps it */}
        <div
          aria-hidden="true"
          className="absolute top-56 bottom-10 right-10 left-[53%] hidden lg:block"
        >
          <img
            src="/experience.png"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#070707_0%,rgba(7,7,7,0.55)_12%,transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_left,#070707_0%,rgba(7,7,7,0.55)_12%,transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,#070707_0%,rgba(7,7,7,0.5)_12%,transparent_25%)]" />
        </div>
        <div className="relative z-10">
        <Reveal>
          <h2 className="display-giant text-[16vw] md:text-[9rem] text-white">EXPERIENCE</h2>
        </Reveal>
        <div className="mt-12 md:mt-16 relative">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-[#242424]" aria-hidden="true" />
          {EXPERIENCE.map((e) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
              className="relative pl-10 md:pl-14 pb-4"
            >
              <span className="absolute left-0 top-2 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full bg-[#050505] border-2 border-[#FF1538] shadow-[0_0_16px_rgba(255,21,56,0.7)]" aria-hidden="true" />
              <p className="font-display text-5xl md:text-7xl text-[#1c1c1c]">{e.year}</p>
              <h3 className="font-display text-3xl md:text-5xl uppercase text-white mt-1">{e.company}</h3>
              <p className="mt-2 font-mono-tech text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#FF1538]">{e.role}</p>
              <p className="mt-1 font-mono-tech text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]">{e.location}</p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl">
                {e.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm text-[#A3A3A3] border-b hairline pb-2.5">
                    <span className="w-1.5 h-1.5 bg-[#FF1538] shrink-0" aria-hidden="true" />{pt}
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-block font-mono-tech text-[11px] tracking-[0.2em] uppercase border border-[#FF1538]/50 text-white px-4 py-2.5 bg-[#FF1538]/10">
                {e.highlight}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
        {/* Full picture below content on mobile / tablet */}
        <Reveal delay={0.05} className="relative z-0 mt-10 lg:hidden">
          <img
            src="/experience.png"
            alt="Developer workspace with MERN stack setup in red ambient light"
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </Reveal>
      </div>
    </section>
  );
}
