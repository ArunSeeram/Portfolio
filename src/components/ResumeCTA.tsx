import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ResumeCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.resume-cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 border-t"
      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
      aria-label="Resume download"
    >
      <div className="max-w-7xl mx-auto">
        <div className="resume-cta-content opacity-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-number">07</span>
              <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
              <span className="section-label">Resume</span>
            </div>
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Want the<br />
              <span style={{ color: 'var(--accent)' }}>full story?</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Download my ATS-optimized resume with the complete breakdown of skills, 
              projects, and technical expertise.
            </p>
            <a
              href="/arun-web-developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic inline-flex items-center gap-3 px-8 py-4 font-mono text-sm tracking-widest uppercase border-2 transition-all duration-300"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--text-primary)',
                background: 'transparent',
                borderRadius: '2px',
                width: 'fit-content',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = '#050505';
                gsap.to(e.currentTarget, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.out' });
              }}
            >
              <span>↓</span>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
