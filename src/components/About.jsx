import { SectionLabel, Reveal } from "./shared";
import { Portrait } from "./Portrait";

const BLOCKS = [
  ["BASED IN", "West Bengal, India"],
  ["EDUCATION", "B.Tech — Information Technology"],
  ["FOCUS", "Full-Stack / AI / Web"],
  ["IDENTITY", "Developer / Builder / Learner"],
];

export function About() {
  return (
    <section id="about" className="border-t hairline bg-[#070707] scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
        <SectionLabel index="06" title="ABOUT" right="RCC INSTITUTE — IT '23" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Portrait src="/portrait-about.jpg" alt="Portrait of Debjit Saha" />
            <p className="mt-4 font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B]">
              FIG. 01 — <span className="text-white">DEBJIT SAHA</span> / BUILDER
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display-giant text-[19vw] sm:text-[13vw] lg:text-[6.5rem] leading-[0.86]">
                <span className="block text-white">WHO</span>
                <span className="block text-white">IS <span className="text-[#FF1538]">DEBJIT?</span></span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-[#c9c9c9] max-w-xl">
                I'm Debjit Saha, a B.Tech Information Technology student
                focused on full-stack development and AI-powered web applications.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#A3A3A3] max-w-xl">
                I enjoy working across the entire product lifecycle —
                from designing interfaces to building APIs, databases
                and intelligent features.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 border-t border-l hairline">
              {BLOCKS.map(([k, v]) => (
                <div key={k} className="border-b border-r hairline px-5 py-5">
                  <p className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#FF1538]">{k}</p>
                  <p className="mt-2 text-[15px] text-white font-medium">{v}</p>
                </div>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-10 font-display text-4xl md:text-6xl uppercase text-white">
                CURIOUS <span className="text-stroke-red">BY DEFAULT.</span>
              </p>
              <p className="mt-3 text-sm text-[#A3A3A3] max-w-md leading-relaxed">
                I like learning by building, experimenting with new
                technologies and turning ideas into working products.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
