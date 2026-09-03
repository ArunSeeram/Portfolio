import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (reduced || isMobile || !sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Pin and horizontal scroll
      const pinTrigger = gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.1}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each project card on enter
      track.querySelectorAll('.proj-card').forEach(card => {
        const img   = card.querySelector('.proj-img');
        const num   = card.querySelector('.proj-num');
        const title = card.querySelector('.proj-title');
        const meta  = card.querySelectorAll('.proj-meta');

        if (!img || !num || !title) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: pinTrigger,
            start: 'left 80%',
            end: 'left 20%',
            toggleActions: 'play none none none',
          },
        })
          .fromTo(img, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' })
          .fromTo(num, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.5')
          .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
          .fromTo(Array.from(meta), { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.4');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ background: 'var(--bg-base)' }}
      aria-labelledby="projects-heading"
    >
      {/* Mobile: vertical stack */}
      <div className="md:hidden py-20 px-6 max-w-7xl mx-auto">
        <div className="divider mb-16" />
        <div className="flex items-center gap-4 mb-6">
          <span className="section-number">05</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">Selected Work</span>
        </div>
        <h2
          id="projects-heading"
          className="font-display font-bold mb-16"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          Projects
        </h2>
        <div className="space-y-16">
          {projects.map((p) => (
            <MobileProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Desktop: horizontal scroll */}
      <div
        ref={trackRef}
        className="hidden md:flex"
        style={{ height: '100vh', width: `${projects.length * 100 + 35}vw` }}
      >
        {/* Intro panel */}
        <div
          className="flex-shrink-0 flex flex-col justify-center px-20 border-r"
          style={{ width: '30vw', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="section-number">05</span>
            <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
            <span className="section-label">Selected Work</span>
          </div>
          <h2
            id="projects-heading"
            className="font-display font-bold leading-none mb-6"
            style={{
              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            Selected<br />
            <span style={{ color: 'var(--accent)' }}>Work</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {projects.length} production projects →
          </p>
        </div>

        {/* Project panels */}
        {projects.map((p) => (
          <DesktopProjectCard key={p.id} project={p} />
        ))}

        {/* End panel */}
        <div
          className="flex-shrink-0 flex flex-col justify-center items-center"
          style={{ width: '35vw', padding: '5rem' }}
        >
          <p className="font-display font-bold text-4xl mb-4" style={{ color: 'var(--text-muted)', letterSpacing: '-0.02em' }}>
            And more coming.
          </p>
          <a
            href="https://github.com/ArunSeeram"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase mt-6 px-6 py-3 border transition-all duration-200"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', borderRadius: '2px' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.color = '#050505';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }}
          >
            View GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Desktop Card ─────────────────────────────────────── */
function DesktopProjectCard({ project: p }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    const img = cardRef.current.querySelector('.proj-img') as HTMLElement;
    if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const img = cardRef.current.querySelector('.proj-img') as HTMLElement;
    if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      className="proj-card flex-shrink-0 flex items-center gap-16 px-16 border-r"
      style={{ width: '100vw', height: '100vh', borderColor: 'var(--border)' }}
      data-cursor="project"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left: project info */}
      <div className="flex flex-col justify-center" style={{ width: '40%' }}>
        <span className="proj-num section-number text-4xl mb-6 opacity-0">{p.number}</span>
        <h3
          className="proj-title font-display font-bold mb-4 opacity-0"
          style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {p.title}
        </h3>
        <p className="proj-meta text-xs font-mono tracking-widest uppercase mb-4 opacity-0" style={{ color: p.accent }}>
          {p.domain}
        </p>
        <p className="proj-meta text-sm leading-relaxed mb-6 opacity-0" style={{ color: 'var(--text-secondary)' }}>
          {p.description}
        </p>
        <div className="proj-meta flex flex-wrap gap-2 mb-6 opacity-0">
          {p.tech.slice(0, 4).map(t => (
            <span key={t} className="skill-tag">{t}</span>
          ))}
        </div>
        <div className="proj-meta flex gap-4 opacity-0">
          {p.live && p.live !== '#' && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)', borderRadius: '2px' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = '#050505';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
            >
              Live ↗
            </a>
          )}
          {p.github && p.github !== '#' && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200"
              style={{ borderColor: 'var(--border-hover)', color: 'var(--text-secondary)', borderRadius: '2px' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>

      {/* Right: image */}
      <div
        className="flex-1 overflow-hidden"
        style={{ height: '65vh', borderRadius: '4px', position: 'relative' }}
      >
        {/* Accent overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: `linear-gradient(135deg, ${p.accent}22 0%, transparent 60%)`, mixBlendMode: 'color' }}
        />
        <img
          src={p.image}
          alt={`${p.title} preview`}
          className="proj-img w-full h-full object-cover opacity-0"
          loading="lazy"
          style={{ transformOrigin: 'center' }}
        />
        {/* Key features overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 z-20"
          style={{
            background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)',
          }}
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: p.accent }}>
            Key Features
          </p>
          <ul className="space-y-1">
            {p.keyFeatures.slice(0, 3).map((f, i) => (
              <li key={i} className="text-xs" style={{ color: 'rgba(232,224,208,0.65)' }}>
                — {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Card ──────────────────────────────────────── */
function MobileProjectCard({ project: p }: { project: typeof projects[0] }) {
  return (
    <article className="border-t pt-8" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="section-number text-2xl">{p.number}</span>
        <span className="skill-tag">{p.domain}</span>
      </div>

      {/* Image */}
      <div className="overflow-hidden mb-6" style={{ height: '240px', borderRadius: '4px', position: 'relative' }}>
        <img src={p.image} alt={`${p.title} preview`} className="w-full h-full object-cover" loading="lazy" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${p.accent}33 0%, transparent 60%)` }}
        />
      </div>

      <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
        {p.title}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {p.tech.slice(0, 4).map(t => <span key={t} className="skill-tag">{t}</span>)}
      </div>
      <div className="flex gap-4">
        {p.live && p.live !== '#' && (
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase px-4 py-2 border"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', borderRadius: '2px' }}>
            Live ↗
          </a>
        )}
        {p.github && p.github !== '#' && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase px-4 py-2 border"
            style={{ borderColor: 'var(--border-hover)', color: 'var(--text-secondary)', borderRadius: '2px' }}>
            GitHub →
          </a>
        )}
      </div>
    </article>
  );
}
