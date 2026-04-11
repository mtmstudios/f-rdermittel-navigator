export default function Footer() {
  return (
    <footer
      className="dark-section py-12"
      style={{
        background: "linear-gradient(135deg, hsl(220 35% 10%) 0%, hsl(220 30% 16%) 100%)",
      }}
    >
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <a href="/" className="text-xl font-extrabold text-white tracking-tight">
              facto<span className="text-accent">net</span>
            </a>
            <p className="text-sm text-white/30 mt-1">Forschungszulage für den Mittelstand</p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="/impressum" className="text-white/40 hover:text-white transition-colors">Impressum</a>
            <a href="/datenschutz" className="text-white/40 hover:text-white transition-colors">Datenschutz</a>
            <a href="#kontakt" className="text-white/40 hover:text-accent transition-colors">Kontakt</a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/20 text-center">
            © 2026 factonet. Alle Rechte vorbehalten. Privates Beratungsangebot — keine staatliche Stelle.
          </p>
        </div>
      </div>
    </footer>
  );
}
