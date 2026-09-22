import { motion } from "framer-motion";
import { CodeXml, Monitor, Server, Database, Wrench, Coffee, Braces, Zap } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiPrisma,
  SiGit,
  SiGithub,
  SiPostman,
  SiVscodium,
  SiLucide,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { SKILL_CATEGORIES } from "../data/content";
import { SectionLabel, Reveal } from "./shared";
import { viewportOnce } from "../animations/reveal";

const EASE = [0.16, 1, 0.3, 1];

const CATEGORY_ICONS = {
  code: CodeXml,
  monitor: Monitor,
  server: Server,
  database: Database,
  wrench: Wrench,
};

/* Technology logos — Simple Icons brand glyphs in official brand colors.
   Java / VS Code have no Simple Icons glyph: Coffee (Java mascot) and
   VSCodium (open-source VS Code build, identical silhouette) are used.
   REST APIs / Server Actions have no brand: neutral Lucide glyphs. */
const SKILL_ICONS = {
  java: Coffee,
  javascript: SiJavascript,
  typescript: SiTypescript,
  html5: SiHtml5,
  css3: SiCss,
  react: SiReact,
  nextjs: SiNextdotjs,
  vite: SiVite,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  nodejs: SiNodedotjs,
  express: SiExpress,
  rest: Braces,
  actions: Zap,
  postgres: SiPostgresql,
  mongo: SiMongodb,
  supabase: SiSupabase,
  prisma: SiPrisma,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  vscode: SiVscodium,
  lucide: SiLucide,
  vercel: SiVercel,
  render: SiRender,
};

function SkillCard({ skill, index }) {
  const Logo = SKILL_ICONS[skill.icon] || CodeXml;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE, delay: 0.25 + index * 0.06 },
        },
      }}
      className="skill-card group relative overflow-hidden rounded-md border hairline bg-[#0A0A0A] p-4 md:p-5 min-w-0"
    >
      {/* red scan sweep on hover */}
      <span className="skill-scan" aria-hidden="true" />
      <div className="skill-mono" aria-hidden="true">
        <Logo size={22} color={skill.color} />
      </div>
      <p className="skill-name mt-4 font-body font-semibold text-[15px] md:text-base text-white break-words">
        {skill.name}
      </p>
      <p className="skill-desc mt-1 font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#6B6B6B] break-words">
        {skill.description}
      </p>
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF1538] group-hover:w-full transition-all duration-500"
        aria-hidden="true"
      />
    </motion.div>
  );
}

function CategoryCard({ category }) {
  const Icon = CATEGORY_ICONS[category.icon] || CodeXml;
  const count = category.skills.length;
  // Dense rows (7 cards) get slightly tighter inner spacing so all cards fit
  // the fixed panel width on desktop — panel width itself never changes.
  const dense = count > 5;
  return (
    <motion.section
      aria-label={category.title}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: {} }}
      transition={{ duration: 0.9, ease: EASE }}
      className="skill-category relative overflow-hidden rounded-md border border-[#FF1538]/25 bg-gradient-to-b from-[#101010] to-[#080808] p-5 md:p-8 shadow-[0_0_50px_-18px_rgba(255,21,56,0.45)]"
    >
      {/* top red hairline */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1538]/70 to-transparent" />
      {/* header */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.1 } },
        }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <span className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-md border border-[#FF1538]/40 bg-[#FF1538]/10 text-[#FF1538]">
            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-xl md:text-2xl uppercase leading-[1.05] text-white">
              {category.title}
            </h3>
            <p className="mt-1.5 font-mono-tech text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#6B6B6B]">
              {category.label}
            </p>
          </div>
        </div>
        <p className="hidden sm:block shrink-0 font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#FF1538]/80 border border-[#FF1538]/30 px-3 py-1.5">
          {String(category.skills.length).padStart(2, "0")} SKILLS
        </p>
      </motion.div>
      {/* skills — internal to the panel: repeat(N, 1fr) shares the fixed
          panel width evenly; row scrolls (hidden scrollbar) only if tight */}
      <motion.div
        variants={{ hidden: {}, show: {} }}
        style={{ "--cols": count }}
        className={`mt-5 md:mt-7 grid grid-flow-col auto-cols-[minmax(150px,1fr)] sm:auto-cols-[minmax(160px,1fr)] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-3 ${dense ? "lg:gap-2 [&_.skill-card]:lg:px-3 [&_.skill-name]:lg:text-sm [&_.skill-desc]:lg:text-[9px]" : ""} overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {category.skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}

const TONE_CLASS = {
  white: "text-white",
  outline: "text-stroke",
  red: "text-[#FF1538]",
};

function Editorial({ category }) {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden py-2">
      {/* subtle oversized background numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-8 -left-2 font-display text-[7rem] md:text-[9rem] leading-none text-white/[0.04]"
      >
        {category.no}
      </span>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="relative font-mono-tech text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#A3A3A3]"
      >
        <span className="text-[#FF1538]">{category.no}</span>
        <span className="mx-2 text-[#3a3a3a]">—</span>
        <span>{category.label}</span>
      </motion.p>
      <h3 className="relative mt-4 display-giant text-[13vw] sm:text-[10vw] lg:text-[3.4rem] xl:text-[4.2rem] max-w-full break-words">
        {category.headline.map((line, i) => (
          <motion.span
            key={line.text}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.1 }}
            className="block"
          >
            <span className={TONE_CLASS[line.tone] || "text-white"}>{line.text}</span>
          </motion.span>
        ))}
      </h3>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className="relative mt-6 h-[2px] w-16 bg-[#FF1538] origin-left"
        aria-hidden="true"
      />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
        className="relative mt-5 max-w-sm text-[15px] leading-relaxed text-[#A3A3A3]"
      >
        {category.blurb}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
        className="relative mt-5 space-y-1.5"
      >
        {category.tags.map((t) => (
          <p key={t} className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#6B6B6B]">
            <span className="text-[#FF1538] mr-2">/</span>
            {t}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

/* ONE shared layout system for all five categories.
   Width belongs to the COMPONENT, not the column: tech panel is always ~65%,
   editorial always ~35%. Only their order alternates per row. */
function CategoryRow({ category, flip }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch lg:items-center w-full">
      <div
        className={`w-full min-w-0 lg:basis-[35%] lg:flex-[0_0_35%] ${flip ? "order-2" : "order-1"}`}
      >
        <Editorial category={category} />
      </div>
      <div
        className={`w-full min-w-0 lg:flex-[1_1_0%] ${flip ? "order-1" : "order-2"}`}
      >
        <CategoryCard category={category} />
      </div>
    </div>
  );
}

export function Technology() {
  const rows = SKILL_CATEGORIES;
  return (
    <section className="relative overflow-hidden border-t hairline">
      {/* subtle technical background — ~8% intensity */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="skills-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-10%] h-[46vmax] w-[46vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,21,56,0.08),transparent_62%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[36vmax] w-[36vmax] rounded-full bg-[radial-gradient(circle,rgba(255,21,56,0.05),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
        <SectionLabel index="04" title="SKILLS & TECH STACK" right="STACK — 2026" />

        {/* header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            {/* headline uses opacity+y fade (same system as the rest of the
                section) so it can never get stuck invisible inside a mask */}
            <h2 className="display-giant text-[15vw] md:text-[7.5rem] leading-[0.86]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE, delay: 0 }}
                className="block text-white"
              >
                SKILLS &
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="block text-[#FF1538]"
              >
                TECH STACK
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="mt-5 font-mono-tech text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#A3A3A3]"
            >
              Technologies I use to <span className="text-white">build real solutions</span>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="flex items-start gap-4 lg:justify-end">
              <span className="mt-1 block w-10 h-[2px] bg-[#FF1538] shrink-0 animate-glow-pulse" aria-hidden="true" />
              <p className="font-display text-2xl md:text-3xl uppercase leading-[0.95] text-white lg:text-right">
                Right tools.
                <br />
                Better solutions.
                <br />
                <span className="text-[#FF1538]">Bigger possibilities.</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* categories — one shared alternating row system, 64/96px rhythm */}
        <div className="mt-12 md:mt-16 flex flex-col gap-16 md:gap-24">
          {rows.map((cat, i) => (
            <CategoryRow key={cat.id} category={cat} flip={i % 2 === 1} />
          ))}
        </div>

        {/* footer micro-text */}
        <Reveal delay={0.05}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t hairline pt-6">
            <p className="font-mono-tech text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#6B6B6B]">
              Build <span className="text-[#FF1538] mx-1">/</span> Deploy{" "}
              <span className="text-[#FF1538] mx-1">/</span> Improve{" "}
              <span className="text-[#FF1538] mx-1">/</span> Repeat
            </p>
            <p className="font-mono-tech text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white border border-[#FF1538]/40 bg-[#FF1538]/10 px-4 py-2">
              <span className="text-[#FF1538]">[</span> Always learning{" "}
              <span className="text-[#FF1538]">]</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
