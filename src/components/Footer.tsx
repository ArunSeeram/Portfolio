export default function Footer() {
  return (
    <footer
      className="py-8 px-6 border-t"
      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Arun Kumar — Built with intention.
        </p>
        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          React · GSAP · WebGL · Tailwind
        </p>
      </div>
    </footer>
  );
}
