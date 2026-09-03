import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    number: '01',
    category: 'Frontend',
    skills: ['React 18/19', 'JavaScript (ES2024)', 'TypeScript', 'Angular', 'HTML5', 'CSS3'],
  },
  {
    number: '02',
    category: 'Styling & UI',
    skills: ['Tailwind CSS', 'Vanilla CSS', 'Responsive Design', 'Design Systems', 'Glassmorphism'],
  },
  {
    number: '03',
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'REST API', 'Next.js 14', 'Server-Sent Events', 'Prisma'],
  },
  {
    number: '04',
    category: 'Database & Storage',
    skills: ['MySQL', 'MongoDB', 'Redis', 'Supabase'],
  },
  {
    number: '05',
    category: 'Integrations',
    skills: ['Razorpay', 'Firebase FCM', 'Shiprocket', 'EmailJS', 'OpenStreetMap'],
  },
  {
    number: '06',
    category: 'Tools & Workflow',
    skills: ['Git', 'GitHub', 'Vite', 'ESLint', 'Docker basics'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !trackRef.current) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // vertical on mobile, no horizontal scroll

    const panels = trackRef.current.querySelectorAll('.skill-panel');
    const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Pin and horizontal scroll
      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stagger reveal each panel's skills on entering
      panels.forEach(panel => {
        const skills = panel.querySelectorAll('.skill-item');
        if (!skills || skills.length === 0) return;

        gsap.fromTo(skills,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: 'left 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-labelledby="skills-heading"
    >
      {/* Vertical layout on mobile */}
      <div className="md:hidden py-20 px-6 max-w-7xl mx-auto">
        <div className="divider mb-16" />
        <div className="flex items-center gap-4 mb-12">
          <span className="section-number">03</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">Skills & Expertise</span>
        </div>
        <h2 id="skills-heading" className="font-display font-bold text-3xl mb-12" style={{ color: 'var(--text-primary)' }}>
          Technical Capabilities
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {skillGroups.map((group, gi) => (
            <div key={gi} className="glass p-6" style={{ borderRadius: '4px' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="section-number">{group.number}</span>
                <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <span key={si} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal scroll on desktop */}
      <div
        ref={trackRef}
        className="hidden md:flex h-screen"
        style={{ width: `${skillGroups.length * 38 + 20}vw` }}
        aria-hidden="false"
      >
        {/* Intro panel */}
        <div
          className="skill-panel flex-shrink-0 flex flex-col justify-center px-20"
          style={{ width: '35vw' }}
        >
          <div className="divider mb-12" style={{ width: '60px' }} />
          <div className="flex items-center gap-4 mb-8">
            <span className="section-number">03</span>
            <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
            <span className="section-label">Skills & Expertise</span>
          </div>
          <h2
            id="skills-heading"
            className="font-display font-bold leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Technical<br />
            <span style={{ color: 'var(--accent)' }}>Capabilities</span>
          </h2>
          <p className="mt-6 text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
            Scroll right to explore →
          </p>
        </div>

        {/* Skill panels */}
        {skillGroups.map((group, gi) => (
          <div
            key={gi}
            className="skill-panel flex-shrink-0 flex flex-col justify-center px-14 border-l"
            style={{
              width: '38vw',
              borderColor: 'var(--border)',
            }}
          >
            <span className="section-number mb-4 text-lg">{group.number}</span>
            <h3
              className="font-display font-bold mb-8"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {group.category}
            </h3>
            <div className="flex flex-col gap-3">
              {group.skills.map((skill, si) => (
                <div
                  key={si}
                  className="skill-item opacity-0 flex items-center gap-4 py-2 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span
                    className="font-display font-medium text-base"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0" style={{ width: '20vw' }} />
      </div>
    </section>
  );
}
