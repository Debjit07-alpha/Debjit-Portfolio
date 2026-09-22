import { motion, useReducedMotion } from "framer-motion";
import { viewportOnce } from "../animations/reveal";

const DRAW_EASE = [0.16, 1, 0.3, 1];

/**
 * RedLineReveal — cinematic TOP → BOTTOM (or LEFT → RIGHT) line draw.
 * A solid line scales open from the leading edge while a bright glowing head
 * rides that edge (parented to the scaled layer, so head and line can never
 * desync). Head flares during the draw, then fades — settling to the normal
 * static line. Transform/opacity only; the image itself is never touched.
 */
export function RedLineReveal({
  className = "",
  lineClassName = "bg-[#FF1538]",
  delay = 0,
  duration = 1,
  orientation = "vertical",
}) {
  const horizontal = orientation === "horizontal";
  const scaleProp = horizontal ? "scaleX" : "scaleY";
  const origin = horizontal ? "origin-left" : "origin-top";
  const reduce = useReducedMotion();
  // Reduced-motion environments suppress transform animations entirely, which
  // would leave a scaleY:0 line permanently invisible — render final state.
  if (reduce) {
    return (
      <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
        <span className={`absolute inset-0 ${lineClassName}`} />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <motion.span
        initial={{ [scaleProp]: 0, opacity: 0 }}
        whileInView={{ [scaleProp]: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration, ease: DRAW_EASE, delay }}
        className={`absolute inset-0 ${origin}`}
      >
        {/* drawn line */}
        <span className={`absolute inset-0 ${lineClassName}`} />
        {/* travelling head — pinned to the drawing edge */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration, ease: "linear", delay, times: [0, 0.08, 0.88, 1] }}
          className={
            horizontal
              ? "absolute top-1/2 -translate-y-1/2 -right-[5px] h-[10px] w-[18px]"
              : "absolute left-1/2 -translate-x-1/2 -bottom-[5px] h-[18px] w-[10px]"
          }
        >
          {/* short comet trail fading back along the drawn line */}
          <span
            aria-hidden="true"
            className={
              horizontal
                ? "absolute inset-0 bg-[linear-gradient(to_left,rgba(255,21,56,0.85),transparent)] blur-[2px]"
                : "absolute inset-0 bg-[linear-gradient(to_top,rgba(255,21,56,0.85),transparent)] blur-[2px]"
            }
          />
          {/* bright core */}
          <span
            aria-hidden="true"
            className={
              horizontal
                ? "absolute top-1/2 -translate-y-1/2 -right-[1px] h-[5px] w-[5px] rounded-full bg-[#FF3B4F] shadow-[0_0_10px_3px_rgba(255,21,56,0.9),0_0_26px_8px_rgba(255,21,56,0.4)]"
                : "absolute left-1/2 -translate-x-1/2 -bottom-[1px] h-[5px] w-[5px] rounded-full bg-[#FF3B4F] shadow-[0_0_10px_3px_rgba(255,21,56,0.9),0_0_26px_8px_rgba(255,21,56,0.4)]"
            }
          />
        </motion.span>
      </motion.span>
    </span>
  );
}

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
