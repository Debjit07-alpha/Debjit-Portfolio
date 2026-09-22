import { useState } from "react";
import { motion } from "framer-motion";
import { viewportOnce } from "../animations/reveal";
import { RedLineReveal } from "./shared";

const CORNERS = [
  { pos: "top-0 left-0 border-t-2 border-l-2", origin: "origin-top-left" },
  { pos: "top-0 right-0 border-t-2 border-r-2", origin: "origin-top-right" },
  { pos: "bottom-0 left-0 border-b-2 border-l-2", origin: "origin-bottom-left" },
  { pos: "bottom-0 right-0 border-b-2 border-r-2", origin: "origin-bottom-right" },
];

/**
 * Cinematic portrait slot.
 * Drop your generated portrait as `public/portrait.jpg` (and optionally
 * `public/portrait-about.jpg`). Until then, a designed monogram fallback
 * renders — no stock face, no altered identity.
 */
export function Portrait({ src = "/portrait.jpg", alt = "Portrait of Debjit Saha", ratio = "aspect-[3/4]", frame = true }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative ${ratio} overflow-hidden bg-[#0A0A0A] grain`}>
      {/* red geometric frame — corners fade in stagger, shapes unchanged */}
      {frame && (
        <>
          {CORNERS.map((c, i) => (
            <motion.div
              key={c.pos}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.1 }}
              className={`absolute ${c.pos} w-10 h-10 border-[#FF1538] z-20 ${c.origin}`}
            />
          ))}
        </>
      )}
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top grayscale-[35%] contrast-[1.08] brightness-[0.92]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-[radial-gradient(120%_90%_at_80%_10%,rgba(255,21,56,0.22),transparent_55%),linear-gradient(180deg,#101010,#050505)]">
          <p className="font-mono-tech text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase">
            PORTRAIT / PLACE YOUR FILE AT
            <br />
            <span className="text-[#F5F5F5]">public{src}</span>
          </p>
          <p className="font-display text-[26vw] md:text-[9rem] leading-none text-[#161616] select-none" aria-hidden="true">
            DS
          </p>
          <p className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3]">
            <span className="text-[#FF1538]">●</span> CINEMATIC TREATMENT — BLACK × RED
          </p>
        </div>
      )}
      {/* cinematic grade overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(180deg,transparent_55%,rgba(5,5,5,0.85))]" />
      {/* left red line — draws top → bottom on viewport entry */}
      <RedLineReveal className="inset-y-0 left-0 w-[3px] z-20" lineClassName="bg-[#FF1538]/80" delay={0.2} />
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
