import { motion } from "framer-motion";
import { EXPLORING } from "../data/content";
import { Reveal } from "./shared";
import { viewportOnce } from "../animations/reveal";

export function Exploring() {
  return (
    <section className="border-t hairline">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Reveal className="lg:col-span-4">
          <p className="font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#FF1538]">/ NEXT</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] text-white mt-3">
            Currently<br />Exploring
          </h2>
          <p className="mt-4 font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#6B6B6B]">
            Distinct from shipped skills —<br />this is the lab.
          </p>
        </Reveal>
        <div className="lg:col-span-8 flex flex-wrap content-start gap-3 lg:justify-end">
          {EXPLORING.map((e, i) => (
            <motion.span
              key={e}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group font-mono-tech text-xs md:text-sm tracking-[0.2em] uppercase border hairline px-5 py-3.5 text-[#A3A3A3] hover:border-[#FF1538] hover:text-white transition-colors"
            >
              <span className="text-[#FF1538] mr-2">+</span>{e}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
