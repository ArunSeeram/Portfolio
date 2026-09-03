import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const techRows = [
  ['REACT', 'NODE.JS', 'TYPESCRIPT', 'NEXT.JS', 'EXPRESS', 'MYSQL'],
  ['TAILWIND', 'VITE', 'REST API', 'RAZORPAY', 'FIREBASE', 'PRISMA'],
  ['ANGULAR', 'REDIS', 'SHIPROCKET', 'JWT', 'GSAP', 'SSE'],
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll('.tech-row-wrap');
      rows.forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(row.querySelector('.tech-row-inner'), {
          x: dir * 200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      gsap.fromTo('.tech-section-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden border-t border-b"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border)',
      }}
      aria-label="Technology stack"
    >
      {/* Label */}
      <div className="tech-section-label max-w-7xl mx-auto px-6 mb-12 opacity-0">
        <div className="flex items-center gap-4">
          <span className="section-number">04</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">How I Build · Tech Stack in Motion</span>
        </div>
      </div>

      {/* Parallax tech rows */}
      {techRows.map((row, ri) => (
        <div
          key={ri}
          className="tech-row-wrap overflow-hidden mb-6"
          aria-hidden="true"
        >
          <div className="tech-row-inner">
            <div className="tech-row">
              {/* Repeat twice for seamless width */}
              {[...row, ...row].map((tech, ti) => (
                <span
                  key={ti}
                  className="font-display font-bold select-none"
                  style={{
                    fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                    letterSpacing: '-0.02em',
                    color: ti % 3 === 0 ? 'var(--accent)' : 'rgba(232, 224, 208, 0.08)',
                    transition: 'color 0.3s ease',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color =
                      ti % 3 === 0 ? 'var(--accent)' : 'rgba(232, 224, 208, 0.08)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
