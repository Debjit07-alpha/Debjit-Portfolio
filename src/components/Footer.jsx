import { ArrowUp, Mail } from "lucide-react";
import { SiGithub, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { PROFILE } from "../data/site";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[#050505]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-display text-3xl md:text-4xl uppercase text-white">
              Debjit <span className="text-[#FF1538]">Saha</span>
            </p>
            <p className="mt-2 font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B]">
              Full-stack developer<br />AI / Web / Product
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono-tech text-[11px] tracking-[0.25em] uppercase">
            <li><a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#FF1538] transition-colors"><SiGithub size={14} aria-hidden="true" />GitHub</a></li>
            <li><a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#FF1538] transition-colors"><FaLinkedin size={14} aria-hidden="true" />LinkedIn</a></li>
            <li><a href={`mailto:${PROFILE.email}`} aria-label="Email" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#FF1538] transition-colors"><Mail size={14} aria-hidden="true" />Email</a></li>
            <li><a href={PROFILE.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#FF1538] transition-colors"><SiX size={13} aria-hidden="true" />X</a></li>
            <li><a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#FF1538] transition-colors"><SiInstagram size={14} aria-hidden="true" />Instagram</a></li>
          </ul>
          <a href="#top" className="group inline-flex items-center gap-3 font-mono-tech text-[11px] tracking-[0.25em] uppercase text-white border hairline px-5 py-3.5 hover:border-[#FF1538] hover:text-[#FF1538] transition-colors w-fit">
            Back to top <ArrowUp size={15} className="transition-transform group-hover:-translate-y-1" />
          </a>
        </div>
        <div className="mt-10 pt-6 border-t hairline flex flex-col sm:flex-row justify-between gap-2 font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#555]">
          <p>© 2026 Debjit Saha — All rights reserved.</p>
          <p>Black × White × <span className="text-[#FF1538]">Crimson</span></p>
        </div>
      </div>
    </footer>
  );
}
