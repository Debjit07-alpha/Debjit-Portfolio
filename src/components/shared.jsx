import { motion } from "framer-motion";
import { viewportOnce } from "../animations/reveal";

export function SectionLabel({ index, title, right }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7 }}
      className="flex items-center justify-between border-b hairline pb-4 mb-10 md:mb-14"
    >
      <p className="font-mono-tech text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#A3A3A3]">
        <span className="text-[#FF1538]">/ {index}</span>
        <span className="mx-2 text-[#3a3a3a]">—</span>
        <span>{title}</span>
      </p>
      {right && (
        <p className="hidden md:block font-mono-tech text-[11px] tracking-[0.25em] uppercase text-[#6B6B6B]">
          {right}
        </p>
      )}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className = "", y = 36 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
