import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { label: 'Clean Code',      desc: 'Maintainable, readable architecture' },
  { label: 'Component Design', desc: 'Scalable, reusable UI systems' },
  { label: 'Performance',     desc: 'Fast loads, smooth interactions' },
  { label: 'Full Stack',      desc: 'React · Node.js · MySQL end-to-end' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveal on scroll
      const words = textRef.current?.querySelectorAll('.word-inner');
      if (words && words.length > 0) {
        gsap.fromTo(Array.from(words),
          { y: '110%' },
          {
            y: '0%',
            stagger: 0.04,
            duration: 0.85,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.about-card');
      if (cards) {
        gsap.fromTo(Array.from(cards),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Section label
      gsap.fromTo('.about-label',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const statement = 'I TURN IDEAS INTO FAST, INTERACTIVE, AND POLISHED DIGITAL EXPERIENCES.'.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: 'var(--bg-base)' }}
      aria-labelledby="about-heading"
    >
      {/* Thin top border */}
      <div className="divider mb-20 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="about-label flex items-center gap-4 mb-16 opacity-0">
          <span className="section-number">02</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">About</span>
        </div>

        {/* Big editorial statement */}
        <div ref={textRef} className="mb-20">
          <h2
            id="about-heading"
            className="font-display font-bold leading-tight flex flex-wrap gap-x-[0.2em] gap-y-1"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            {statement.map((word, i) => (
              <span key={i} className="word-wrap">
                <span
                  className="word-inner"
                  style={{ color: ['FAST,', 'INTERACTIVE,', 'POLISHED'].includes(word) ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              I'm a full-stack web developer with hands-on experience across{' '}
              <span style={{ color: 'var(--accent)' }}>React</span>,{' '}
              <span style={{ color: 'var(--accent)' }}>Node.js / Express</span>,{' '}
              <span style={{ color: 'var(--accent)' }}>TypeScript</span>, and{' '}
              <span style={{ color: 'var(--accent)' }}>MySQL</span>.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              As a Web Developer Intern at{' '}
              <span style={{ color: 'var(--accent)' }}>Suraise Solutions</span>{' '}
              (8 months) I worked across the complete product lifecycle: system design,
              Figma UI/UX, frontend development, API integration, QA testing, and
              production deployment. Before that, I built REST APIs and handled
              backend deployments at{' '}
              <span style={{ color: 'var(--accent)' }}>Aniweb Technologies</span>.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I've delivered 8+ production-grade projects — from enterprise POS platforms
              and real estate marketplaces to e-commerce storefronts and healthcare portals —
              always prioritising clean architecture, smooth UX, and real-world reliability.
            </p>
          </div>

          {/* Highlight cards */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="about-card glass p-5 opacity-0"
                style={{
                  borderRadius: '4px',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                }}
              >
                <div
                  className="w-6 h-px mb-4"
                  style={{ background: 'var(--accent)' }}
                />
                <p
                  className="font-display font-semibold text-sm mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {h.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
