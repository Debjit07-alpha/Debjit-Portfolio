export const CAPABILITIES = [
  {
    n: "01",
    titleA: "FULL-STACK",
    titleB: "APPLICATIONS",
    body: "From frontend interfaces to backend APIs, databases and deployment.",
    icon: "layers",
  },
  {
    n: "02",
    titleA: "AI-POWERED",
    titleB: "PRODUCTS",
    body: "Practical AI experiences using LLMs, intelligent workflows and automation.",
    icon: "brain",
  },
  {
    n: "03",
    titleA: "FRONTEND",
    titleB: "EXPERIENCES",
    body: "Responsive and interactive interfaces built around real users and real products.",
    icon: "monitor",
  },
  {
    n: "04",
    titleA: "BACKEND",
    titleB: "SYSTEMS",
    body: "APIs, authentication, databases, persistence and application architecture.",
    icon: "server",
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "languages",
    no: "01",
    headline: [
      { text: "BUILD", tone: "white" },
      { text: "WITH", tone: "outline" },
      { text: "LANGUAGES", tone: "red" },
    ],
    blurb: "The foundation of every great application starts with the right language.",
    tags: ["SYNTAX / LOGIC / SOLVE", "IDEAS / INTO / REALITY"],
    title: "LANGUAGES",
    label: "PROGRAMMING LANGUAGES",
    icon: "code",
    skills: [
      { name: "Java", icon: "java", color: "#ED8B00", description: "OOP & Problem Solving" },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E", description: "Modern Web Development" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6", description: "Type Safety" },
      { name: "HTML5", icon: "html5", color: "#E34F26", description: "Semantic Markup" },
      { name: "CSS3", icon: "css3", color: "#1572B6", description: "Modern Styling" },
    ],
  },
  {
    id: "frontend",
    no: "02",
    headline: [
      { text: "DESIGN", tone: "white" },
      { text: "INTERFACES", tone: "white" },
      { text: "THAT MATTER", tone: "red" },
    ],
    blurb: "Beautiful, responsive and interactive experiences for the modern web.",
    tags: ["DESIGN / DEVELOP / DEPLOY", "IDEAS / INTO / PRODUCTS"],
    title: "FRONTEND & FRAMEWORKS",
    label: "INTERFACES & EXPERIENCES",
    icon: "monitor",
    skills: [
      { name: "React.js", icon: "react", color: "#61DAFB", description: "Component UI" },
      { name: "Next.js", icon: "nextjs", color: "#FFFFFF", description: "Full-Stack Framework" },
      { name: "Vite", icon: "vite", color: "#646CFF", description: "Fast Build Tool" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4", description: "Utility-First Styling" },
      { name: "Framer Motion", icon: "framer", color: "#0055FF", description: "UI Animation" },
    ],
  },
  {
    id: "backend",
    no: "03",
    headline: [
      { text: "BUILD", tone: "white" },
      { text: "SERVICES", tone: "white" },
      { text: "THAT SCALE", tone: "red" },
    ],
    blurb: "Reliable server-side logic and clean APIs that keep products running.",
    tags: ["REQUEST / RESPONSE / REPEAT", "DATA / INTO / ACTION"],
    title: "BACKEND & APIs",
    label: "SERVERS & INTEGRATION",
    icon: "server",
    skills: [
      { name: "Node.js", icon: "nodejs", color: "#5FA04E", description: "JavaScript Runtime" },
      { name: "Express.js", icon: "express", color: "#FFFFFF", description: "Web Framework" },
      { name: "REST APIs", icon: "rest", color: "#F5F5F5", description: "API Development" },
      { name: "Next.js Server Actions", icon: "actions", color: "#FFFFFF", description: "Server-Side Actions" },
    ],
  },
  {
    id: "database",
    no: "04",
    headline: [
      { text: "STORE", tone: "white" },
      { text: "WHAT", tone: "white" },
      { text: "MATTERS", tone: "red" },
    ],
    blurb: "Structured, reliable persistence behind every feature.",
    tags: ["SCHEMA / QUERY / SCALE", "TRUST / DATA / FOUNDATION"],
    title: "DATABASE & BACKEND SERVICES",
    label: "DATA & PERSISTENCE",
    icon: "database",
    skills: [
      { name: "PostgreSQL", icon: "postgres", color: "#4169E1", description: "Relational Database" },
      { name: "MongoDB", icon: "mongo", color: "#47A248", description: "NoSQL Database" },
      { name: "Supabase", icon: "supabase", color: "#3FCF8E", description: "Backend Platform" },
      { name: "Prisma", icon: "prisma", color: "#FFFFFF", description: "Database ORM" },
    ],
  },
  {
    id: "tools",
    no: "05",
    headline: [
      { text: "RIGHT", tone: "white" },
      { text: "TOOLS.", tone: "white" },
      { text: "BETTER", tone: "white" },
      { text: "SOLUTIONS.", tone: "white" },
      { text: "BIGGER", tone: "red" },
      { text: "POSSIBILITIES.", tone: "red" },
    ],
    blurb: "The everyday toolkit for writing, testing and shipping products to production.",
    tags: ["BUILD / TEST / SHIP", "ITERATE / DEPLOY / REPEAT"],
    title: "TOOLS, UI & DEPLOYMENT",
    label: "TOOLS & DELIVERY",
    icon: "wrench",
    skills: [
      { name: "Git", icon: "git", color: "#F05032", description: "Version Control" },
      { name: "GitHub", icon: "github", color: "#FFFFFF", description: "Code Collaboration" },
      { name: "Postman", icon: "postman", color: "#FF6C37", description: "API Testing" },
      { name: "VS Code", icon: "vscode", color: "#2F80ED", description: "Development Environment" },
      { name: "Lucide React", icon: "lucide", color: "#F56565", description: "Icon Library" },
      { name: "Vercel", icon: "vercel", color: "#FFFFFF", description: "Frontend Deployment" },
      { name: "Render", icon: "render", color: "#46E3B7", description: "Backend Deployment" },
    ],
  },
];

export const EXPERIENCE = [
  {
    year: "2026",
    company: "WEB SKITTERS",
    role: "Software Development Intern — MERN Stack",
    location: "Kolkata, India",
    points: [
      "Full-stack web development",
      "MERN stack development",
      "REST APIs",
      "MongoDB",
      "React",
      "Node.js",
      "Express.js",
    ],
    highlight: "Major internship project: TastyBites",
  },
];

export const HACKATHONS = [
  {
    name: "SMART INDIA HACKATHON 2025",
    role: "Team Leader",
    status: "Rank 7 / Waitlisted",
    meta: "NATIONAL HACKATHON",
  },
  {
    name: "PEC HACKS 3.0",
    role: "Builder",
    status: "Top 50 Finalist",
    meta: "INTERNATIONAL HACKATHON — 36 HOURS",
  },
  {
    name: "ICDMAI HACKATHON 2024",
    role: "Builder",
    status: "Participant",
    meta: "AI HACKATHON",
  },
];

export const EXPLORING = ["AI / LLMs", "RAG", "MCP", "System Design", "Backend Architecture", "Cloud Deployment"];

export const FAQS = [
  {
    q: "What kind of projects do I build?",
    a: "Modern web applications and AI-powered products — from full-stack platforms with real databases and auth, to RAG assistants, dashboards and data-visualization tools. I like taking ideas from concept to deployed product.",
  },
  {
    q: "What technologies do I work with?",
    a: "React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, Prisma, Python and LlamaIndex for AI/RAG work. Deployed on Vercel and Render, tested with Postman, versioned with Git/GitHub.",
  },
  {
    q: "Are you open to collaborations?",
    a: "Yes. I enjoy collaborating with other builders, designers and student teams — especially on web products, AI experiments and hackathon builds. Reach out with your idea and we can scope it together.",
  },
  {
    q: "Are you available for internships?",
    a: "Yes — open to internships, collaborations and exciting software opportunities, particularly full-stack and AI-adjacent roles. Email is the fastest way to reach me.",
  },
  {
    q: "Can I see your GitHub projects?",
    a: "Absolutely. Everything is public on GitHub — MEDIKIOS, TastyBites, the water-borne diseases predictor, repo_mcp and more. Each project section links directly to code and live demos.",
  },
];
