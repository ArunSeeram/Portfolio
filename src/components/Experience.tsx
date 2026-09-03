import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────── */
const experiences = [
  {
    id: 'freelance',
    period: '2021 – 2022',
    role: 'Freelance IT Support',
    company: 'IT Hardware Shops / Freelance',
    type: 'IT & Hardware',
    accent: '#7a8a9e',
    responsibilities: [
      'Operating system installation and configuration',
      'Diagnosing and resolving hardware & software problems',
      'Desktop setup, maintenance, and troubleshooting',
      'General IT support for customers and local businesses',
      'System performance troubleshooting and optimisation',
    ],
    tags: ['OS Installation', 'Hardware Troubleshooting', 'System Maintenance', 'IT Support'],
    workflow: null,
    note: 'Hands-on technical foundation before moving into professional web development.',
  },
  {
    id: 'aniweb',
    period: 'Nov 2025 – Jan 2026',
    duration: '2 Months',
    role: 'Backend Developer Intern',
    company: 'Aniweb Technologies',
    type: 'Remote Internship',
    accent: '#6e8ec8',
    responsibilities: [
      'Developed backend REST APIs for web applications using Express.js',
      'Built and structured backend application logic and API workflows',
      'Integrated APIs with application requirements and frontend needs',
      'Tested API functionality, responses, and edge cases',
      'Deployed applications using Railway, Hostinger, and VPS servers',
      'Troubleshot deployment and backend configuration issues',
    ],
    tags: ['Express.js', 'REST APIs', 'Node.js', 'Railway', 'Hostinger', 'VPS Deployment'],
    workflow: [
      'REQUIREMENTS',
      'API DESIGN',
      'EXPRESS.JS DEV',
      'API TESTING',
      'DEPLOYMENT',
      'PRODUCTION',
    ],
    note: null,
  },
  {
    id: 'suraise',
    period: 'Jan 2026 – Sep 2026',
    duration: '8 Months',
    role: 'Web Developer Intern',
    company: 'Suraise Solutions',
    type: 'Full-time Internship',
    accent: '#c8a96e',
    responsibilities: [
      'Contributed to multiple real-world web application projects end-to-end',
      'Participated in system design and application architecture planning',
      'Created Figma designs and contributed to UI/UX design decisions',
      'Developed responsive interfaces using React and Tailwind CSS',
      'Integrated REST APIs with frontend applications',
      'Implemented and connected frontend modules with backend services',
      'Performed QA testing: UI behavior, API integrations, and responsiveness',
      'Identified bugs and worked on fixes before deployment and production releases',
    ],
    tags: ['React', 'Tailwind CSS', 'Figma', 'REST APIs', 'QA Testing', 'System Design', 'Deployment'],
    workflow: [
      'SYSTEM DESIGN',
      'FIGMA / UI-UX',
      'FRONTEND DEV',
      'API INTEGRATION',
      'QA / TESTING',
      'DEPLOYMENT',
      'PRODUCTION',
    ],
    note: 'Full web development lifecycle — from architecture to production.',
    isCurrent: true,
  },
];

const skillSummary = [
  {
    category: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Responsive UI'],
    accent: '#c8a96e',
  },
  {
    category: 'UI / UX',
    items: ['Figma', 'UI Design', 'UX Design'],
    accent: '#c8a96e',
  },
  {
    category: 'Backend',
    items: ['Express.js', 'REST APIs', 'Node.js'],
    accent: '#6e8ec8',
  },
  {
    category: 'Quality',
    items: ['QA Testing', 'Bug Testing', 'Workflow Testing'],
    accent: '#8ec86e',
  },
  {
    category: 'Deployment',
    items: ['Railway', 'Hostinger', 'VPS', 'Vercel'],
    accent: '#c86e8e',
  },
  {
    category: 'Systems',
    items: ['System Design', 'App Architecture', 'Deployment Workflows'],
    accent: '#6ec8a9',
  },
  {
    category: 'IT Support',
    items: ['OS Installation', 'Hardware Diagnosis', 'System Maintenance'],
    accent: '#7a8a9e',
  },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const reduced     = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Label entrance
      gsap.fromTo('.exp-label',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // Timeline line draws progressively
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.exp-timeline',
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      // Stat cards
      gsap.fromTo('.exp-stat',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-stats', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // Each experience entry
      document.querySelectorAll('.exp-entry').forEach((entry, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(entry.querySelector('.exp-dot'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
        )
        .fromTo(entry.querySelector('.exp-period'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2'
        )
        .fromTo(entry.querySelector('.exp-role'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' }, '-=0.3'
        )
        .fromTo(entry.querySelector('.exp-company'),
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.3'
        )
        .fromTo(entry.querySelectorAll('.exp-resp-item'),
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' }, '-=0.2'
        )
        .fromTo(entry.querySelectorAll('.exp-tag'),
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, stagger: 0.05, duration: 0.35, ease: 'back.out(1.5)' }, '-=0.3'
        );

        // Workflow steps
        const steps = entry.querySelectorAll('.workflow-step');
        if (steps.length) {
          tl.fromTo(Array.from(steps),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.4'
          );
          tl.fromTo(entry.querySelectorAll('.workflow-arrow'),
            { opacity: 0, scaleX: 0, transformOrigin: 'left center' },
            { opacity: 1, scaleX: 1, stagger: 0.1, duration: 0.3, ease: 'power2.out' }, '-=0.5'
          );
        }

        // Previous entries fade gently when new one appears
        if (i > 0) {
          const prevEntry = document.querySelectorAll('.exp-entry')[i - 1];
          if (prevEntry) {
            gsap.to(prevEntry, {
              opacity: 0.45,
              scrollTrigger: {
                trigger: entry,
                start: 'top 60%',
                end: 'top 30%',
                scrub: 1,
              },
            });
          }
        }
      });

      // Skill summary grid
      gsap.fromTo('.exp-skill-card',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          stagger: { amount: 0.6, from: 'start' },
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-skills-grid', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: 'var(--bg-surface)' }}
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Label ─────────────────────────────────── */}
        <div className="exp-label opacity-0 flex items-center gap-4 mb-16">
          <span className="section-number">06</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">Experience</span>
        </div>

        {/* ── Heading ───────────────────────────────── */}
        <div className="mb-6">
          <h2
            id="experience-heading"
            className="font-display font-bold leading-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Design → Build →<br />
            <span style={{ color: 'var(--accent)' }}>Integrate → Test → Deploy</span>
          </h2>
        </div>

        {/* ── Summary stats ─────────────────────────── */}
        <div className="exp-stats grid grid-cols-3 md:grid-cols-3 gap-4 mb-24">
          {[
            { label: 'Web Dev Experience', value: '12 Mo', sub: 'Internship (8 Mo + 2 Mo Backend)' },
            { label: 'Client Projects Delivered', value: '8+', sub: 'Production-grade applications' },
            { label: 'Full Lifecycle Roles', value: '2', sub: 'Design → Deploy' },
          ].map((s, i) => (
            <div
              key={i}
              className="exp-stat glass p-5 opacity-0"
              style={{ borderRadius: '4px' }}
            >
              <p
                className="font-display font-bold mb-1"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', color: 'var(--accent)', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
              <p className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {s.label}
              </p>
              <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Timeline ──────────────────────────────── */}
        <div className="exp-timeline relative">
          {/* Vertical line */}
          <div
            className="absolute hidden md:block"
            style={{
              left: '11rem',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--border)',
            }}
            aria-hidden="true"
          >
            <div
              ref={lineRef}
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, var(--accent), rgba(200,169,110,0.1))', transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-24">
            {experiences.map((exp) => (
              <ExperienceEntry key={exp.id} exp={exp} />
            ))}
          </div>
        </div>

        {/* ── What I've Worked Across ────────────────── */}
        <div className="mt-32">
          <div className="flex items-center gap-4 mb-4">
            <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
            <span className="section-label">What I Have Worked Across</span>
          </div>
          <h3
            className="font-display font-bold mb-12"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Full-Stack Development Lifecycle
          </h3>

          <div className="exp-skills-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {skillSummary.map((group, i) => (
              <div
                key={i}
                className="exp-skill-card glass p-4 opacity-0"
                style={{ borderRadius: '4px', borderTop: `2px solid ${group.accent}` }}
              >
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-3 font-semibold"
                  style={{ color: group.accent }}
                >
                  {group.category}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Single Experience Entry ──────────────────────────────── */
function ExperienceEntry({ exp }: { exp: typeof experiences[0] }) {
  return (
    <article className="exp-entry relative" aria-label={`${exp.role} at ${exp.company}`}>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">

        {/* ── Left: Period ──────────────────── */}
        <div className="md:w-44 flex-shrink-0 flex md:flex-col md:items-end md:text-right items-center gap-4 relative">
          {/* Timeline dot */}
          <div
            className="exp-dot hidden md:flex absolute -right-px top-2 translate-x-1/2 w-3 h-3 rounded-full border-2 items-center justify-center z-10"
            style={{
              borderColor: exp.accent,
              background: 'var(--bg-surface)',
              boxShadow: `0 0 12px ${exp.accent}66`,
            }}
            aria-hidden="true"
          />
          <span
            className="exp-period font-mono text-sm tracking-wider font-bold opacity-0"
            style={{ color: exp.accent }}
          >
            {exp.period}
          </span>
          {exp.duration && (
            <span className="font-mono text-xs opacity-0" style={{ color: 'var(--text-muted)' }}>
              {exp.duration}
            </span>
          )}
          <span
            className="font-mono text-xs px-2 py-0.5 border opacity-0"
            style={{
              borderColor: `${exp.accent}44`,
              color: exp.accent,
              borderRadius: '2px',
            }}
          >
            {exp.type}
          </span>
        </div>

        {/* ── Right: Content ──────────────── */}
        <div className="flex-1 pl-0 md:pl-10">
          {/* Role */}
          <h3
            className="exp-role font-display font-bold mb-1 opacity-0"
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              color: exp.isCurrent ? exp.accent : 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {exp.role}
            {exp.isCurrent && (
              <span
                className="ml-3 font-mono text-xs px-2 py-0.5 border align-middle"
                style={{ borderColor: `${exp.accent}66`, color: exp.accent, borderRadius: '99px', verticalAlign: 'middle' }}
              >
                Latest
              </span>
            )}
          </h3>
          <p
            className="exp-company font-display font-semibold text-base mb-6 opacity-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            {exp.company}
          </p>

          {/* Note */}
          {exp.note && (
            <p
              className="font-mono text-xs italic mb-6 opacity-70"
              style={{ color: exp.accent }}
            >
              {exp.note}
            </p>
          )}

          {/* Responsibilities */}
          <ul className="space-y-2 mb-6">
            {exp.responsibilities.map((r, i) => (
              <li
                key={i}
                className="exp-resp-item flex items-start gap-3 text-sm opacity-0"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: exp.accent }}
                  aria-hidden="true"
                />
                {r}
              </li>
            ))}
          </ul>

          {/* Workflow diagram */}
          {exp.workflow && (
            <div className="mb-6">
              <p className="section-label mb-3">Lifecycle</p>
              <div className="flex flex-wrap items-center gap-2">
                {exp.workflow.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="workflow-step font-mono text-xs px-3 py-1.5 border opacity-0"
                      style={{
                        borderColor: `${exp.accent}55`,
                        color: step === 'PRODUCTION' || step === 'DEPLOYMENT' ? exp.accent : 'var(--text-secondary)',
                        background: step === 'PRODUCTION' ? `${exp.accent}15` : 'transparent',
                        borderRadius: '2px',
                        fontWeight: step === 'PRODUCTION' ? 600 : 400,
                        letterSpacing: '0.08em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step}
                    </span>
                    {i < exp.workflow!.length - 1 && (
                      <span
                        className="workflow-arrow font-mono text-xs opacity-0"
                        style={{ color: 'var(--text-muted)' }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag, i) => (
              <span key={i} className="exp-tag skill-tag opacity-0">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="mt-12 divider"
        style={{ background: 'var(--border)' }}
        aria-hidden="true"
      />
    </article>
  );
}
