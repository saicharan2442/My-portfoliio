import { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import HeroVideoIntro from './sections/HeroVideoIntro';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CyberGrid from './components/background/CyberGrid';
import NeuralBackground from './components/background/NeuralBackground';
import MatrixRain from './components/background/MatrixRain';
import FloatingCode from './components/background/FloatingCode';
import CursorGlow from './components/background/CursorGlow';
import HUDOverlay from './components/ui/HUDOverlay';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/ui/Navbar';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  useSmoothScroll(introDone);

  return (
    <>
      {/* background layers */}
      <CyberGrid />
      <NeuralBackground />
      <MatrixRain />
      <FloatingCode />

      {/* UI overlays */}
      <Navbar />
      <CursorGlow />
      <HUDOverlay />
      <ScrollProgress />

      {/* intro */}
      <HeroVideoIntro onComplete={() => setIntroDone(true)} skipped={false} />

      {/* main content */}
      <main className="relative z-10">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
