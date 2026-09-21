import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/site";
import { Reveal } from "./shared";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t hairline scroll-mt-16 grain">
      {/* red-black cinematic backdrop */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(255,21,56,0.28),transparent_60%),radial-gradient(60%_50%_at_85%_20%,rgba(255,21,56,0.12),transparent_60%),linear-gradient(180deg,#050505_0%,#0d0205_60%,#050505_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#FF1538]/60" />
      <div aria-hidden="true" className="absolute -right-10 top-10 font-display text-[26vw] leading-none text-white/[0.03] select-none pointer-events-none">
        DS
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 py-24 md:py-36">
        <Reveal>
          <p className="font-mono-tech text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#A3A3A3] border-b border-white/10 pb-4 mb-10">
            <span className="text-[#FF1538]">/ 07</span><span className="mx-2 text-[#3a3a3a]">—</span> CONTACT
          </p>
        </Reveal>
        <Reveal>
          <h2 className="display-giant text-[17vw] md:text-[10rem] leading-[0.85]">
            <span className="block text-white">HAVE AN</span>
            <span className="block text-white">IDEA?</span>
            <span className="block text-[#FF1538] mt-2">LET'S</span>
            <span className="block text-[#FF1538]">BUILD IT.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-md text-[#c9c9c9] leading-relaxed">
            Open to internships, collaborations and exciting software opportunities.
          </p>
          <p className="mt-3 font-mono-tech text-sm tracking-[0.1em] text-white break-all">{PROFILE.email}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex items-center gap-3 bg-[#FF1538] text-white font-mono-tech text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors"
            >
              Send email <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-white/25 text-white font-mono-tech text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-[#FF1538] hover:text-[#FF1538] transition-colors"
            >
              LinkedIn <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-white/25 text-white font-mono-tech text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-[#FF1538] hover:text-[#FF1538] transition-colors"
            >
              GitHub <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </Reveal>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B]">
          <span>Kolkata / West Bengal — IN</span>
          <span className="text-[#FF1538]">● Available</span>
          <span>Response — within 48h</span>
        </div>
      </div>
    </section>
  );
}
