import { SectionLabel, Reveal } from "./shared";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
        <SectionLabel index="01" title="APPROACH" right="DS — 2026" />
        <div className="relative z-10">
          <Reveal>
            <h2 className="display-giant text-[13.5vw] md:text-[7.5rem] lg:text-[9rem]">
              <span className="block text-[#F5F5F5]">I DON'T JUST</span>
              <span className="block text-[#F5F5F5]">
                WRITE <span className="text-[#FF1538]">CODE.</span>
              </span>
              <span className="block text-stroke mt-2">I BUILD</span>
              <span className="block text-[#F5F5F5]">PRODUCTS.</span>
            </h2>
          </Reveal>
          <div className="mt-8 md:mt-10 flex items-start gap-3">
            <span className="mt-1 block w-8 h-[2px] bg-[#FF1538]" aria-hidden="true" />
            <p className="font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#6B6B6B]">
              Concept → Interface → Backend → Deploy
            </p>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#A3A3A3] max-w-md">
              I enjoy taking ideas from concept to interface, backend,
              database and deployment — turning them into working products.
            </p>
          </Reveal>
        </div>
        {/* Desktop visual — right-side layer inside the container, headline overlaps it */}
        <div
          aria-hidden="true"
          className="absolute top-56 bottom-10 right-10 left-[53%] hidden lg:block"
        >
          <img
            src="/approch.png"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#050505_0%,rgba(5,5,5,0.55)_12%,transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_left,#050505_0%,rgba(5,5,5,0.55)_12%,transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,#050505_0%,rgba(5,5,5,0.5)_12%,transparent_25%)]" />
        </div>
        {/* Full picture below text on mobile / tablet */}
        <Reveal delay={0.05} className="relative z-0 mt-10 lg:hidden">
          <img
            src="/approch.png"
            alt="Workspace with laptop showing code in red ambient light"
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </Reveal>
      </div>
    </section>
  );
}
