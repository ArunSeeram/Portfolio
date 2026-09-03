import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (reduced || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, 28px)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    const expand = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = '60px';
      ringRef.current.style.height = '60px';
      ringRef.current.style.borderColor = 'var(--accent)';
      ringRef.current.style.opacity = '0.8';
    };

    const shrink = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = '36px';
      ringRef.current.style.height = '36px';
      ringRef.current.style.borderColor = 'rgba(232, 224, 208, 0.5)';
      ringRef.current.style.opacity = '1';
    };

    const showLabel = (text: string) => {
      if (!labelRef.current) return;
      labelRef.current.textContent = text;
      labelRef.current.style.opacity = '1';
      if (ringRef.current) {
        ringRef.current.style.width = '80px';
        ringRef.current.style.height = '80px';
        ringRef.current.style.borderColor = 'var(--accent)';
      }
    };

    const hideLabel = () => {
      if (!labelRef.current) return;
      labelRef.current.style.opacity = '0';
      shrink();
    };

    // Detect cursor context
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('[data-cursor="project"]')) {
        showLabel('VIEW PROJECT');
      } else if (target.closest('[data-cursor="explore"]')) {
        showLabel('EXPLORE');
      } else if (target.closest('a, button, [role="button"], .magnetic')) {
        expand();
        hideLabel();
      } else {
        shrink();
        hideLabel();
      }
    };

    const leave = () => setVisible(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', leave);
    raf = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [reduced, visible]);

  if (reduced || typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div
        className="custom-cursor"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div className="cursor-dot" ref={dotRef} />
      </div>
      <div
        className="cursor-ring"
        ref={ringRef}
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s, width 0.3s, height 0.3s, border-color 0.3s' }}
      />
      <div className="cursor-label" ref={labelRef} />
    </>
  );
}
