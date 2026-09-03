import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState('INITIALIZING');

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const duration = reduced ? 0.4 : 1.8;
    const counter = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            onComplete();
          },
        });

        exitTl
          .to([logoRef.current, percentTextRef.current?.parentElement, statusRef.current], {
            y: -30,
            opacity: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power3.in',
          })
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut',
            },
            '-=0.15'
          );
      },
    });

    // Animate counter from 0 to 100
    tl.to(counter, {
      val: 100,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const current = Math.round(counter.val);
        setPercent(current);

        if (current < 30) {
          setStatus('INITIALIZING SYSTEM');
        } else if (current < 65) {
          setStatus('CALIBRATING MOTION');
        } else if (current < 90) {
          setStatus('COMPILING SHADERS');
        } else {
          setStatus('EXPERIENCE READY');
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${current}%`;
        }
      },
    });

    // Subtle breathing pulse on the monogram
    if (!reduced && logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.94, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete, reduced]);

  return (
    <aside
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto"
      style={{
        background: '#050505',
        color: 'var(--text-primary)',
      }}
      aria-label="Loading portfolio"
      role="dialog"
      aria-modal="true"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--accent)' }}
          />
          <span className="font-mono text-xs tracking-widest uppercase text-muted">
            ARUN KUMAR
          </span>
        </div>
        <span className="font-mono text-xs tracking-widest uppercase text-muted">
          PORTFOLIO // 2026
        </span>
      </div>

      {/* Center Monogram */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div ref={logoRef} className="relative flex flex-col items-center">
          {/* Subtle gold glow backing */}
          <div
            className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(200,169,110,0.2) 0%, transparent 70%)',
              transform: 'scale(1.8)',
            }}
            aria-hidden="true"
          />

          <h1
            className="font-display font-extrabold tracking-tight relative z-10 select-none"
            style={{
              fontSize: 'clamp(5rem, 16vw, 12rem)',
              lineHeight: 1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.04em',
            }}
          >
            AK<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>

          {/* Status message */}
          <div className="mt-4 flex items-center gap-3">
            <span
              className="w-6 h-px"
              style={{ background: 'var(--accent)', opacity: 0.5 }}
            />
            <p
              ref={statusRef}
              className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--text-secondary)' }}
            >
              {status}
            </p>
            <span
              className="w-6 h-px"
              style={{ background: 'var(--accent)', opacity: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-1.5">
            <span
              ref={percentTextRef}
              className="font-display font-bold tabular-nums text-4xl md:text-6xl"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
            >
              {percent.toString().padStart(2, '0')}
            </span>
            <span
              className="font-mono text-lg md:text-2xl font-bold"
              style={{ color: 'var(--accent)' }}
            >
              %
            </span>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
              DESIGN → BUILD → DEPLOY
            </span>
            <span className="font-mono text-[10px] text-muted">
              [ 08 PRODUCTION PROJECTS ]
            </span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div
          className="w-full h-1 overflow-hidden relative"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
          }}
        >
          <div
            ref={progressBarRef}
            className="h-full transition-all duration-75 ease-out"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, rgba(200,169,110,0.5) 0%, #c8a96e 100%)',
              boxShadow: '0 0 12px rgba(200,169,110,0.4)',
              borderRadius: '999px',
            }}
          />
        </div>
      </div>
    </aside>
  );
}
