import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: 'Email',
    href: 'mailto:arunseeram111@gmail.com',
    display: 'arunseeram111@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ArunSeeram',
    display: 'github.com/ArunSeeram',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arun-kumar-7432b2250',
    display: 'linkedin.com/in/arun-kumar',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced    = useReducedMotion();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus]     = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-heading .word-inner',
        { y: '110%' },
        {
          y: '0%',
          stagger: 0.06,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(['.contact-form', '.contact-socials'],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem 1.25rem',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    borderRadius: '2px',
    transition: 'border-color 0.25s ease',
  };

  const headline = 'LET\'S BUILD SOMETHING.'.split(' ');

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 border-t"
      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="section-number">08</span>
          <span className="divider" style={{ width: '40px', display: 'inline-block' }} />
          <span className="section-label">Contact</span>
        </div>

        {/* Big heading */}
        <h2
          id="contact-heading"
          className="contact-heading font-display font-bold leading-tight mb-20 flex flex-wrap gap-x-[0.2em]"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 7.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          {headline.map((word, i) => (
            <span key={i} className="word-wrap">
              <span
                className="word-inner"
                style={{ color: word === 'SOMETHING.' ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form opacity-0 space-y-5" noValidate>
            <div>
              <label className="section-label block mb-2" htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label className="section-label block mb-2" htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label className="section-label block mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="magnetic w-full py-4 font-mono text-sm tracking-widest uppercase border-2 transition-all duration-300"
              style={{
                borderColor: 'var(--accent)',
                color: status === 'sent' ? '#050505' : 'var(--text-primary)',
                background: status === 'sent' ? 'var(--accent)' : 'transparent',
                borderRadius: '2px',
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sending' ? 'wait' : 'pointer',
              }}
              onMouseEnter={e => {
                if (status !== 'sending') {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = '#050505';
                }
              }}
              onMouseLeave={e => {
                if (status !== 'sent') {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
            >
              {status === 'idle'    && 'Send Message →'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent'    && '✓ Message Sent!'}
              {status === 'error'   && 'Failed — Try Again'}
            </button>
          </form>

          {/* Socials */}
          <div className="contact-socials opacity-0 flex flex-col justify-between">
            <div>
              <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
                Open to full-time roles, freelance projects, and collaborations.
                Drop a message or reach out directly.
              </p>

              <div className="space-y-6">
                {socials.map(s => (
                  <div key={s.label} className="border-b pb-6" style={{ borderColor: 'var(--border)' }}>
                    <p className="section-label mb-1">{s.label}</p>
                    <a
                      href={s.href}
                      target={s.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-lg transition-colors duration-200"
                      style={{ color: 'var(--text-primary)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    >
                      {s.display} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
