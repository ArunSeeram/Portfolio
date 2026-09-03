import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import TechStack from './components/TechStack';
import HorizontalProjects from './components/HorizontalProjects';
import Experience from './components/Experience';
import ResumeCTA from './components/ResumeCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      gsap.set(bar, { scaleX: progress });
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div id="scroll-progress" aria-hidden="true" />;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useLenis();

  // Force dark theme class on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <ScrollProgress />
      <CustomCursor />
      <Navbar isLoaded={!loading} />
      <main>
        <Hero isLoaded={!loading} />
        <About />
        <Skills />
        <TechStack />
        <HorizontalProjects />
        <Experience />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
