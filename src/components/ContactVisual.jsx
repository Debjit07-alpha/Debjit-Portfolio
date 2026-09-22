/**
 * Abstract communication / network centerpiece for the Contact section.
 * Pure SVG + CSS — no image assets, no laptops, no stock imagery.
 * Feathered radial mask melts every edge into the black background.
 * Palette is strictly black + white/gray + crimson (#FF1538).
 */
const PARTICLES = [
  { cx: 96, cy: 150, r: 2.2, fill: "#FF1538", delay: "0s", dur: "7s" },
  { cx: 150, cy: 470, r: 1.8, fill: "#F5F5F5", delay: "1.2s", dur: "8s" },
  { cx: 70, cy: 330, r: 1.5, fill: "#FF1538", delay: "2.1s", dur: "6s" },
  { cx: 505, cy: 120, r: 2, fill: "#F5F5F5", delay: "0.6s", dur: "9s" },
  { cx: 545, cy: 420, r: 2.4, fill: "#FF1538", delay: "1.8s", dur: "7.5s" },
  { cx: 470, cy: 520, r: 1.6, fill: "#F5F5F5", delay: "2.6s", dur: "8.5s" },
  { cx: 240, cy: 80, r: 1.5, fill: "#FF1538", delay: "3.1s", dur: "6.5s" },
  { cx: 380, cy: 60, r: 1.8, fill: "#F5F5F5", delay: "0.3s", dur: "7.8s" },
  { cx: 120, cy: 540, r: 1.7, fill: "#FF1538", delay: "1.5s", dur: "8.2s" },
  { cx: 540, cy: 260, r: 1.5, fill: "#F5F5F5", delay: "2.9s", dur: "6.8s" },
];

const SURFACE_NODES = [
  { cx: 300, cy: 178, delay: "0s" },
  { cx: 392, cy: 252, delay: "1.1s" },
  { cx: 356, cy: 372, delay: "2.2s" },
  { cx: 238, cy: 348, delay: "0.6s" },
  { cx: 208, cy: 238, delay: "1.7s" },
  { cx: 300, cy: 300, delay: "2.8s" },
];

export function ContactVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-auto w-full select-none max-w-md lg:max-w-none"
    >
      {/* ambient crimson atmosphere */}
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(255,21,56,0.24),rgba(255,21,56,0.06)_48%,transparent_70%)] blur-2xl" />

      {/* feathered stage — no rectangular boundary */}
      <div className="relative [mask-image:radial-gradient(circle_at_center,black_50%,transparent_76%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_50%,transparent_76%)]">
        <svg
          viewBox="0 0 600 600"
          className="h-auto w-full"
        >
          <defs>
            <radialGradient id="cv-core" cx="38%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#3d0a12" />
              <stop offset="45%" stopColor="#160407" />
              <stop offset="100%" stopColor="#050505" />
            </radialGradient>
            <radialGradient id="cv-node" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF1538" />
              <stop offset="100%" stopColor="#FF1538" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint data ring */}
          <circle cx="300" cy="300" r="262" fill="none" stroke="#F5F5F5" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="2 9" />

          {/* slow precessing orbit rings */}
          <g className="animate-orbit-spin" style={{ transformOrigin: "300px 300px" }}>
            <g transform="rotate(-18 300 300)">
              <circle cx="300" cy="300" r="212" fill="none" stroke="#FF1538" strokeOpacity="0.35" strokeWidth="1.2" />
            </g>
          </g>
          <g className="animate-orbit-spin-rev" style={{ transformOrigin: "300px 300px" }}>
            <g transform="rotate(24 300 300)">
              <ellipse cx="300" cy="300" rx="248" ry="118" fill="none" stroke="#F5F5F5" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="3 7" />
            </g>
          </g>

          {/* travelling satellites on the crimson ring */}
          <g transform="rotate(-18 300 300)">
            <circle
              cx="300" cy="300" r="212" fill="none" stroke="#FF1538" strokeWidth="3"
              strokeLinecap="round" pathLength="100" strokeDasharray="2.5 97.5"
              className="animate-dash-orbit" opacity="0.9"
            />
            <circle
              cx="300" cy="300" r="212" fill="none" stroke="#F5F5F5" strokeWidth="2"
              strokeLinecap="round" pathLength="100" strokeDasharray="1 99"
              className="animate-dash-orbit-slow" opacity="0.7"
            />
          </g>

          {/* globe core */}
          <circle cx="300" cy="300" r="130" fill="url(#cv-core)" />
          {/* meridians */}
          <ellipse cx="300" cy="300" rx="130" ry="130" fill="none" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1" />
          <ellipse cx="300" cy="300" rx="86" ry="130" fill="none" stroke="#F5F5F5" strokeOpacity="0.12" strokeWidth="1" />
          <ellipse cx="300" cy="300" rx="42" ry="130" fill="none" stroke="#F5F5F5" strokeOpacity="0.10" strokeWidth="1" />
          {/* parallels */}
          <ellipse cx="300" cy="258" rx="112" ry="26" fill="none" stroke="#F5F5F5" strokeOpacity="0.10" strokeWidth="1" />
          <ellipse cx="300" cy="300" rx="130" ry="30" fill="none" stroke="#F5F5F5" strokeOpacity="0.12" strokeWidth="1" />
          <ellipse cx="300" cy="344" rx="108" ry="25" fill="none" stroke="#F5F5F5" strokeOpacity="0.10" strokeWidth="1" />
          {/* rim light */}
          <circle cx="300" cy="300" r="130" fill="none" stroke="#FF1538" strokeOpacity="0.55" strokeWidth="1.6" />

          {/* glowing surface nodes */}
          {SURFACE_NODES.map((n) => (
            <g key={`${n.cx}-${n.cy}`}>
              <circle cx={n.cx} cy={n.cy} r="10" fill="url(#cv-node)" opacity="0.6" />
              <circle cx={n.cx} cy={n.cy} r="3.5" fill="#FF1538" className="animate-glow-pulse" style={{ animationDelay: n.delay }} />
            </g>
          ))}

          {/* collaboration links to outer symbols */}
          <g stroke="#F5F5F5" strokeOpacity="0.14" strokeWidth="1">
            <line x1="392" y1="252" x2="470" y2="180" />
            <line x1="238" y1="348" x2="158" y2="408" />
            <line x1="356" y1="372" x2="430" y2="448" />
          </g>

          {/* tiny interface symbols — whisper quiet */}
          <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="15" fill="#A3A3A3" opacity="0.55" textAnchor="middle">
            <text x="478" y="176" className="animate-float-soft" style={{ animationDelay: "0.4s" }}>@</text>
            <text x="150" y="414" className="animate-float-soft" style={{ animationDelay: "1.6s" }}>&lt;/&gt;</text>
            <text x="438" y="454" className="animate-float-soft" style={{ animationDelay: "2.4s" }}>→</text>
          </g>
          <g fill="#FF1538">
            <circle cx="470" cy="180" r="2.6" className="animate-glow-pulse" style={{ animationDelay: "0.9s" }} />
            <circle cx="158" cy="408" r="2.6" className="animate-glow-pulse" style={{ animationDelay: "2s" }} />
            <circle cx="430" cy="448" r="2.6" className="animate-glow-pulse" style={{ animationDelay: "3s" }} />
          </g>

          {/* drifting particles */}
          {PARTICLES.map((p, i) => (
            <circle
              key={i}
              cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} opacity="0.5"
              className="animate-float-soft"
              style={{ animationDelay: p.delay, animationDuration: p.dur }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
