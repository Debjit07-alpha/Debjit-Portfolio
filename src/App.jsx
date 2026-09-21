import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Philosophy } from "./components/Philosophy";
import { Projects } from "./components/Projects";
import { Capabilities } from "./components/Capabilities";
import { Technology } from "./components/Technology";
import { Experience } from "./components/Experience";
import { Hackathons } from "./components/Hackathons";
import { About } from "./components/About";
import { Exploring } from "./components/Exploring";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] antialiased overflow-x-clip">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div className="grain-fixed" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Projects />
        <Capabilities />
        <Technology />
        <Experience />
        <Hackathons />
        <About />
        <Exploring />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  );
}

export default App;
