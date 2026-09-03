import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Work',       id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
];

interface NavbarProps {
  isLoaded?: boolean;
}

export default function Navbar({ isLoaded = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef    = useRef<HTMLElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Navbar entrance
  useEffect(() => {
    if (!navRef.current || !isLoaded) return;
    gsap.fromTo(navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
    );
  }, [isLoaded]);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      tlRef.current = gsap.timeline();
      tlRef.current
        .fromTo(menuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
        .fromTo(menuRef.current.querySelectorAll('a'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' },
          '-=0.2'
        );
    } else {
      document.body.style.overflow = '';
      if (tlRef.current) tlRef.current.reverse();
    }
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0"
        style={{
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(5,5,5,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-display font-bold text-lg tracking-tight"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Go to top"
          >
            AK<span style={{ color: 'var(--accent)' }}>.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative"
                style={{
                  color: active === link.id ? 'var(--accent)' : 'var(--text-secondary)',
                }}
                aria-current={active === link.id ? 'page' : undefined}
              >
                {link.label}
                {active === link.id && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => window.open('/arun-web-developer.pdf', '_blank')}
              className="font-mono text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-200"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                borderRadius: '2px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = '#050505';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
            >
              Resume
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block h-px transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                width: menuOpen ? '24px' : '16px',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col justify-center items-center"
          style={{ background: 'rgba(5,5,5,0.97)' }}
        >
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={e => { e.preventDefault(); scrollTo(link.id); }}
                className="font-display font-bold text-4xl tracking-tight opacity-0"
                style={{ color: 'var(--text-primary)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/arun-web-developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase mt-4 opacity-0"
              style={{ color: 'var(--accent)' }}
            >
              Download Resume ↗
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
