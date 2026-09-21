import { motion } from "framer-motion";
import { ArrowUpRight, CodeXml } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { SectionLabel, Reveal } from "./shared";
import { ProjectVisual } from "./ProjectVisual";
import { viewportOnce } from "../animations/reveal";

function Links({ p, light = false }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] uppercase px-5 py-3 transition-colors ${
            light ? "bg-[#F5F5F5] text-black hover:bg-[#FF1538] hover:text-white" : "border hairline text-white hover:border-[#FF1538] hover:text-[#FF1538]"
          }`}
        >
          Live website <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
      <a
        href={p.github}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] uppercase px-5 py-3 border hairline text-[#A3A3A3] hover:text-white hover:border-white/40 transition-colors"
      >
        <CodeXml size={14} /> GitHub <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

function TechList({ items }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="font-mono-tech text-[10px] tracking-[0.18em] uppercase border hairline px-3 py-1.5 text-[#A3A3A3]">
          {t}
        </span>
      ))}
    </div>
  );
}

export function Projects() {
  const [featured, ...rest] = PROJECTS;
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32 scroll-mt-16">
      <SectionLabel index="02" title="SELECTED WORK" right="2024 → 2026" />

      <Reveal>
        <h2 className="display-giant text-[20vw] md:text-[10rem] leading-[0.85] text-[#F5F5F5]">
          PRO<span className="text-[#FF1538]">J</span>ECTS
        </h2>
        <p className="mt-4 font-mono-tech text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#A3A3A3]">
          Real ideas. <span className="text-white">Real products.</span> <span className="text-[#FF1538]">Real impact.</span>
        </p>
      </Reveal>

      {/* FEATURED — MEDIKIOS */}
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="group mt-14 md:mt-20 border-t-2 border-[#FF1538] pt-8"
        data-cursor="OPEN →"
      >
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="font-display text-6xl md:text-8xl text-[#1e1e1e] group-hover:text-[#FF1538] transition-colors">01</span>
          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#FF1538]">{featured.category}</p>
            <h3 className="font-display text-5xl md:text-7xl uppercase text-white group-hover:translate-x-2 transition-transform duration-500">
              {featured.title}
            </h3>
            <p className="font-mono-tech text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mt-1">{featured.subtitle}</p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-[#A3A3A3] leading-relaxed">{featured.description}</p>
        <div className="mt-8 overflow-hidden">
          <div className="transition-transform duration-700 group-hover:scale-[1.015]">
            <ProjectVisual mock={featured.mock} />
          </div>
        </div>
        <TechList items={featured.technologies} />
        <div className="mt-4 flex flex-wrap gap-2">
          {featured.concepts.map((c) => (
            <span key={c} className="font-mono-tech text-[10px] tracking-[0.2em] text-[#FF1538]/80">#{c}</span>
          ))}
        </div>
        <Links p={featured} light />
      </motion.article>

      {/* REST — asymmetric editorial */}
      <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
        {rest.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 border-t hairline pt-8 ${flip ? "" : ""}`}
              data-cursor={p.live ? "VIEW" : "CODE"}
            >
              <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl text-[#1e1e1e] group-hover:text-[#FF1538] transition-colors">{p.id}</span>
                  <p className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#6B6B6B]">{p.category}</p>
                </div>
                <h3 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] text-white mt-3 group-hover:translate-x-1.5 transition-transform duration-500">
                  {p.title}
                </h3>
                <p className="font-mono-tech text-[11px] tracking-[0.25em] uppercase text-[#FF1538] mt-2">{p.subtitle}</p>
                <p className="mt-5 text-[#A3A3A3] leading-relaxed text-[15px]">{p.description}</p>
                {p.collabNote && (
                  <p className="mt-3 font-mono-tech text-[10px] tracking-[0.15em] uppercase text-[#6B6B6B] border-l-2 border-[#FF1538] pl-3">
                    {p.collabNote}
                  </p>
                )}
                <TechList items={p.technologies} />
                {p.backend && (
                  <a href={p.backend} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] hover:text-[#FF1538] underline underline-offset-4">
                    Backend API →
                  </a>
                )}
                <Links p={p} />
              </div>
              <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""} ${i === 1 ? "lg:pt-10" : i === 3 ? "lg:pt-16" : ""}`}>
                <div className="overflow-hidden border-l-2 border-transparent group-hover:border-[#FF1538] transition-colors duration-500">
                  <div className="transition-transform duration-700 group-hover:scale-[1.02]">
                    <ProjectVisual mock={p.mock} />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {p.concepts.slice(0, 6).map((c) => (
                    <span key={c} className="font-mono-tech text-[10px] tracking-[0.2em] text-[#555]">#{c}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
