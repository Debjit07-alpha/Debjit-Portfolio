import { motion } from "framer-motion";
import { Layers, BrainCircuit, MonitorSmartphone, ServerCog } from "lucide-react";
import { CAPABILITIES } from "../data/content";
import { SectionLabel, Reveal } from "./shared";
import { viewportOnce } from "../animations/reveal";

const ICONS = {
  layers: Layers,
  brain: BrainCircuit,
  monitor: MonitorSmartphone,
  server: ServerCog,
};

export function Capabilities() {
  return (
    <section className="border-t hairline bg-[#070707]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
        <SectionLabel index="03" title="CAPABILITIES" right="WHAT I DO" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <Reveal className="lg:col-span-8">
            <h2 className="display-giant text-[17vw] md:text-[8rem] leading-[0.86]">
              <span className="block text-white">WHAT</span>
              <span className="block text-white">I <span className="text-[#FF1538]">BUILD</span></span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="text-[#A3A3A3] leading-relaxed max-w-xs lg:ml-auto">
              Turning ideas into real-world products through code, design and technology.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l hairline">
          {CAPABILITIES.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
                className="group relative border-b border-r hairline p-7 md:p-10 min-h-[280px] flex flex-col justify-between hover:bg-[#0d0d0d] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono-tech text-xs tracking-[0.3em] text-[#FF1538]">{c.n}</span>
                  <Icon size={22} strokeWidth={1.5} className="text-[#555] group-hover:text-[#FF1538] transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl uppercase leading-[0.9] text-white">
                    {c.titleA}<br />{c.titleB}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#A3A3A3] max-w-sm">{c.body}</p>
                </div>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF1538] group-hover:w-full transition-all duration-500" aria-hidden="true" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
