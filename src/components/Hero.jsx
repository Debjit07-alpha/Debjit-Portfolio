import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/site";
import { Portrait } from "./Portrait";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden grain pt-16">
      {/* backdrop typography */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-x-0 top-24 overflow-hidden">
        <p className="font-display text-[22vw] leading-none text-transparent text-stroke opacity-[0.14] whitespace-nowrap text-center">
          DEBJIT — 2026
        </p>
      </div>
      {/* red vertical hairline */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FF1538]/10 hidden lg:block" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 pt-10 md:pt-16 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-end">
        {/* LEFT */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-mono-tech text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#A3A3A3] space-y-1.5"
          >
            <p>// FULL-STACK</p>
            <p>// AI</p>
            <p>// WEB</p>
            <p>// PRODUCT BUILDER</p>
          </motion.div>

          <h1 className="mt-6 display-giant text-[19vw] sm:text-[15vw] lg:text-[8.2rem] xl:text-[9.5rem]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="block text-[#F5F5F5]"
              >
                BUILD
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="block text-[#FF1538]"
              >
                DIGITAL
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                className="block text-[#F5F5F5]"
              >
                EXPERIENCES
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-6 font-mono-tech text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#F5F5F5]"
          >
            {PROFILE.roleLine}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-4 max-w-md text-[15px] md:text-base leading-relaxed text-[#A3A3A3]"
          >
            I build modern web applications and AI-powered products
            <br className="hidden md:block" /> that turn ideas into real-world experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-[#F5F5F5] text-black font-mono-tech text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-[#FF1538] hover:text-white transition-colors"
            >
              View my work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-[#2a2a2a] text-[#F5F5F5] font-mono-tech text-xs tracking-[0.2em] uppercase px-7 py-4 hover:border-[#FF1538] hover:text-[#FF1538] transition-colors"
            >
              Get in touch
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — portrait */}
        <motion.div style={{ y: imgY }} className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="relative red-glow"
          >
            <Portrait src="/portrait.png" />
            {/* side caption */}
            <div className="absolute -left-3 md:-left-12 bottom-8 hidden sm:block">
              <p className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#F5F5F5] [writing-mode:vertical-rl] rotate-180 bg-[#050505]/70 px-2 py-4 border-l border-[#FF1538]">
                TURNING IDEAS INTO REAL PRODUCTS
              </p>
            </div>
            <div className="absolute -bottom-5 left-5 right-5 flex items-center justify-between bg-[#0A0A0A] border hairline px-4 py-3">
              <p className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#A3A3A3]">
                DS — <span className="text-white">Kolkata, IN</span>
              </p>
              <p className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#FF1538]">EST. 2026</p>
            </div>
          </motion.div>
          <p className="sm:hidden mt-8 font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3]">
            TURNING IDEAS INTO REAL PRODUCTS.
          </p>
        </motion.div>
      </div>

      {/* bottom tech strip */}
      <div className="relative border-t hairline mt-6">
        <div className="overflow-hidden py-4">
          <div className="animate-marquee flex whitespace-nowrap gap-0 w-max">
            {[0, 1].map((k) => (
              <p key={k} aria-hidden={k === 1} className="font-mono-tech text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#6B6B6B] pr-8">
                REACT <span className="text-[#FF1538] mx-3">×</span> NEXT.JS <span className="text-[#FF1538] mx-3">×</span> TYPESCRIPT <span className="text-[#FF1538] mx-3">×</span> NODE.JS <span className="text-[#FF1538] mx-3">×</span> MONGODB <span className="text-[#FF1538] mx-3">×</span> POSTGRESQL <span className="text-[#FF1538] mx-3">×</span> AI <span className="text-[#FF1538] mx-3">×</span>&nbsp;
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
