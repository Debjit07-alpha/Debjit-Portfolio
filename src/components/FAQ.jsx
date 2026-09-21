import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../data/content";
import { SectionLabel, Reveal } from "./shared";

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
      <SectionLabel index="—" title="FAQ" right="QUESTIONS" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] text-white">
            Ask<br /><span className="text-[#FF1538]">Me.</span>
          </h2>
        </Reveal>
        <div className="lg:col-span-8 border-t hairline">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b hairline">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left py-5 md:py-6 group"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono-tech text-[11px] text-[#FF1538]">0{i + 1}</span>
                    <span className={`font-medium text-base md:text-lg transition-colors ${isOpen ? "text-white" : "text-[#c9c9c9] group-hover:text-white"}`}>
                      {f.q}
                    </span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className={isOpen ? "text-[#FF1538]" : "text-[#6B6B6B]"}>
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-8 md:pl-10 pr-4 text-[15px] leading-relaxed text-[#A3A3A3] max-w-2xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
