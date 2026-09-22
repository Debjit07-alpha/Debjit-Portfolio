import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/site";
import { useScrollProgress } from "../hooks/hooks";

const SPRING = { type: "spring", stiffness: 400, damping: 32 };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver (no extra scroll listeners)
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href).filter((h) => h.startsWith("#"));
    const sections = ids
      .map((h) => document.querySelector(h))
      .filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open ]);

  const current = hovered ?? active;

  return (
    <>
      <div className="fixed top-3 md:top-5 inset-x-0 z-[80] flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -10, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={`pointer-events-auto relative w-[92%] max-w-[1200px] rounded-2xl border transition-colors duration-300 ${
            scrolled
              ? "border-[rgba(255,255,255,0.12)] bg-[rgba(10,10,12,0.88)] backdrop-blur-xl"
              : "border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,12,0.72)] backdrop-blur-md"
          }`}
        >
          <nav
            className="h-12 md:h-[52px] flex items-center justify-between pl-3 pr-2 md:px-4"
            aria-label="Primary"
          >
            <a href="#top" aria-label="DS — back to top" className="block shrink-0 rounded-lg">
              <img
                src="/favicon.png"
                alt="DS logo"
                className="block h-10 w-10 md:h-11 md:w-11 object-contain"
              />
            </a>
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => {
                const isCurrent = current === l.href;
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      aria-current={active === l.href ? "true" : undefined}
                      onMouseEnter={() => setHovered(l.href)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(l.href)}
                      onBlur={() => setHovered(null)}
                      className={`relative block rounded-lg px-3.5 py-2 font-mono-tech text-[11px] tracking-[0.3em] uppercase transition-colors duration-200 ${
                        isCurrent ? "text-white" : "text-[#A3A3A3] hover:text-white"
                      }`}
                    >
                      {isCurrent && (
                        <motion.span
                          layoutId="navbar-active"
                          transition={SPRING}
                          className={`absolute inset-0 rounded-lg border ${
                            active === l.href
                              ? "border-[rgba(255,21,56,0.35)] bg-[rgba(255,21,56,0.10)]"
                              : "border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)]"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">
                        {active === l.href && (
                          <span className="text-[#FF1538] mr-1" aria-hidden="true">/</span>
                        )}
                        {l.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="hidden md:flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#F5F5F5] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#FF1538] animate-dot" aria-hidden="true" />
              Available
            </div>
            <button
              className="md:hidden p-2 text-[#F5F5F5] rounded-lg"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
          {/* scroll progress — inset to respect the capsule radius */}
          <div className="absolute bottom-1.5 left-4 right-4 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden" aria-hidden="true">
            <div className="h-full bg-[#FF1538] rounded-full" style={{ width: `${progress * 100}%` }} />
          </div>

          {/* mobile panel — same capsule language */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden absolute top-[calc(100%+8px)] inset-x-0 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,12,0.92)] backdrop-blur-xl px-5 py-6 grain overflow-hidden"
              >
                <ul className="space-y-1">
                  {NAV_LINKS.map((l, i) => (
                    <motion.li
                      key={l.label}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-3 rounded-lg px-2 py-2 font-display text-4xl uppercase leading-none text-[#F5F5F5] hover:text-[#FF1538] transition-colors"
                      >
                        <span className="font-mono-tech text-xs text-[#FF1538]">0{i + 1}</span>
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#A3A3A3]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF1538] animate-dot mr-2" />
                  Available — Kolkata, India
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </>
  );
}
