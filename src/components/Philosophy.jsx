import { SectionLabel, Reveal } from "./shared";

export function Philosophy() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
      <SectionLabel index="01" title="APPROACH" right="DS — 2026" />
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
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 flex items-start gap-3">
          <span className="mt-1 block w-8 h-[2px] bg-[#FF1538]" aria-hidden="true" />
          <p className="font-mono-tech text-[11px] tracking-[0.3em] uppercase text-[#6B6B6B]">
            Concept → Interface → Backend → Deploy
          </p>
        </div>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <p className="text-base md:text-lg leading-relaxed text-[#A3A3A3] max-w-md">
            I enjoy taking ideas from concept to interface, backend,
            database and deployment — turning them into working products.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
