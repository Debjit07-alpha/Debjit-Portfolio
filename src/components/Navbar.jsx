import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/site";
import { useScrollProgress } from "../hooks/hooks";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open ]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed top-0 inset-x-0 z-[80] border-b hairline transition-colors duration-300 ${
          scrolled ? "bg-[#050505]/92 backdrop-blur-md" : "bg-[#050505]/60 backdrop-blur-sm"
        }`}
      >
        <nav
          className="mx-auto max-w-[1440px] px-5 md:px-10 h-16 flex items-center justify-between"
          aria-label="Primary"
        >
          <a href="#top" className="font-display text-xl tracking-wider text-[#F5F5F5]">
            D<span className="text-[#FF1538]">S</span>
          </a>
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#A3A3A3] hover:text-white transition-colors"
                >
                  <span className="text-[#FF1538] opacity-0 group-hover:opacity-100 transition-opacity mr-1">/</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#F5F5F5]">
            <span className="w-2 h-2 rounded-full bg-[#FF1538] animate-dot" aria-hidden="true" />
            Available
          </div>
          <button
            className="md:hidden p-2 -mr-2 text-[#F5F5F5]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {/* scroll progress */}
        <div className="absolute bottom-[-1px] left-0 h-[2px] bg-[#FF1538]" style={{ width: `${progress * 100}%` }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[75] bg-[#050505]/98 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 grain"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-6xl uppercase leading-[0.95] text-[#F5F5F5] hover:text-[#FF1538] transition-colors"
                  >
                    <span className="font-mono-tech text-xs text-[#FF1538] align-super mr-3">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-12 font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#A3A3A3]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF1538] animate-dot mr-2" />
              Available — Kolkata, India
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
