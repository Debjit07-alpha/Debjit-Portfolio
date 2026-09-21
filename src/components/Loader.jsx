import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const DURATION = 1700;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out
      const eased = Math.round((1 - Math.pow(1 - t, 3)) * 100);
      setProgress(eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onDone && onDone(), 450);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center grain"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="font-display text-6xl md:text-7xl tracking-wide">
            <span className="text-[#F5F5F5]">D</span>
            <span className="text-[#FF1538]">S</span>
          </div>
          <div className="mt-8 w-56 md:w-72 h-px bg-[#1C1C1C] relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#FF1538] transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono-tech text-xs tracking-[0.3em] text-[#F5F5F5]">
            {progress}%
          </p>
          <p className="mt-3 font-mono-tech text-[10px] tracking-[0.35em] text-[#6B6B6B] uppercase">
            Digital Experience / 2026
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
