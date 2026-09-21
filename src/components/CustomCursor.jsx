import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMousePosition, useMediaQuery } from "../hooks/hooks";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const fine = useMediaQuery("(pointer: fine)");
  const [hover, setHover] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    setVisible(true);
    document.documentElement.classList.add("cursor-none-fine");
    const onOver = (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (t) {
        setHover(t.getAttribute("data-cursor") || "OPEN");
      } else {
        setHover(null);
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [fine]);

  if (!fine || !visible) return null;

  const active = hover !== null;
  return (
    <motion.div
      className="fixed top-0 left-0 z-[95] pointer-events-none"
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-white mix-blend-difference"
          />
        ) : (
          <motion.div
            key="ring"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-20 h-20 -ml-10 -mt-10 rounded-full bg-[#FF1538] flex items-center justify-center"
          >
            <span className="font-mono-tech text-[9px] tracking-[0.2em] text-white">{hover} →</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
