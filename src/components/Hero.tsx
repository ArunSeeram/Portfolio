import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ShaderBackground from './ShaderBackground';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = true }: HeroProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const reduced     = useReducedMotion();

  useEffect(() => {
    if (!isLoaded) return;

    if (reduced) {
      // Just show everything immediately
      [eyebrowRef, line1Ref, line2Ref, subRef, ctaRef, scrollRef].forEach(r => {
        if (r.current) r.current.style.opacity = '1';
      });
      return;
    }

    // Intro animation timeline
    const tl = gsap.timeline({ delay: 0.1 });

    // Eyebrow
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    // Headline words
    const words1 = line1Ref.current?.querySelectorAll('.word-inner');
    const words2 = line2Ref.current?.querySelectorAll('.word-inner');
    if (words1) {
      tl.fromTo(Array.from(words1),
        { y: '105%' },
        { y: '0%', duration: 0.9, stagger: 0.07, ease: 'power4.out' },
        '-=0.3'
      );
    }
    if (words2) {
      tl.fromTo(Array.from(words2),
        { y: '105%' },
        { y: '0%', duration: 0.9, stagger: 0.07, ease: 'power4.out' },
        '-=0.6'
      );
    }

    // Sub
    tl.fromTo(subRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // CTAs
    tl.fromTo(ctaRef.current?.children ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );

    // Scroll indicator
    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, [reduced, isLoaded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const headline1 = ['I', 'BUILD', 'DIGITAL'];
  const headline2 = ['EXPERIENCES', 'THAT', 'MOVE.'];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <ShaderBackground />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="opacity-0 mb-8 flex items-center gap-4">
          <span className="section-number">01</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">Full-Stack Developer · Design → Build → Deploy</span>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-display font-bold leading-none mb-8"
          style={{
            fontSize: 'clamp(3rem, 9vw, 9.5rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {/* Line 1 */}
          <div ref={line1Ref} className="flex flex-wrap gap-x-[0.25em] mb-1">
            {headline1.map((word, i) => (
              <div key={i} className="word-wrap">
                <span
                  className="word-inner"
                  style={{ color: word === 'DIGITAL' ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
          {/* Line 2 */}
          <div ref={line2Ref} className="flex flex-wrap gap-x-[0.25em]">
            {headline2.map((word, i) => (
              <div key={i} className="word-wrap">
                <span className="word-inner">{word}</span>
              </div>
            ))}
          </div>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="opacity-0 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          Arun Kumar — Full-stack web developer. I design, build, integrate,
          test, and deploy production-grade applications.
          React · Node.js · Express · MySQL · TypeScript.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          {/* Primary */}
          <button
            onClick={() => scrollToSection('projects')}
            className="magnetic group px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300 border"
            style={{
              borderColor: 'var(--accent)',
              color: '#050505',
              background: 'var(--accent)',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              gsap.to(e.currentTarget, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.out' });
            }}
          >
            View Work →
          </button>

          {/* Secondary */}
          <button
            onClick={() => window.open('/arun-web-developer.pdf', '_blank')}
            className="magnetic px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300 border"
            style={{
              borderColor: 'var(--border-hover)',
              color: 'var(--text-secondary)',
              background: 'transparent',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            }}
          >
            Download Resume ↗
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="section-label" style={{ fontSize: '9px' }}>Scroll</span>
        <div
          className="w-px h-12 overflow-hidden"
          style={{ background: 'var(--border)' }}
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
              animation: 'scrollLine 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
