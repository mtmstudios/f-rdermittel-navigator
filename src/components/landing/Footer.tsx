export default function Footer() {
  return (
    <footer style={{ background: "hsl(222 47% 9%)" }} className="dark-section py-10">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[15px] font-bold text-white">factonet</span>
            <span className="text-[13px] text-white/20 ml-3">by PCA Partners WPG</span>
          </div>
          <div className="flex gap-8 text-[13px]">
            <a href="/impressum" className="text-white/30 hover:text-white/60 transition-colors">Impressum</a>
            <a href="/datenschutz" className="text-white/30 hover:text-white/60 transition-colors">Datenschutz</a>
          </div>
        </div>
        <div className="border-t border-white/5 pt-4">
          <p className="text-[11px] text-white/15 text-center">
            © 2026 factonet. Alle Rechte vorbehalten. Privates Beratungsangebot — keine staatliche Stelle.
          </p>
        </div>
      </div>
    </footer>
  );
}
