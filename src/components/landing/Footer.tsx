const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

export default function Footer() {
  return (
    <footer style={{ background: "#050505" }} className="dark-section py-14">
      <div className="container-main">
        {/* Top */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <img src={PCA_LOGO} alt="PCA Partners" className="h-6 brightness-0 invert opacity-50" />
            <span className="text-[12px] text-white/30 border-l border-white/8 pl-4 font-medium tracking-wide">
              München & Passau
            </span>
          </div>
          <div className="flex gap-8 text-[13px]">
            <a href="/impressum" className="text-white/40 hover:text-white/70 transition-colors duration-300">Impressum</a>
            <a href="/datenschutz" className="text-white/40 hover:text-white/70 transition-colors duration-300">Datenschutz</a>
            <a href="https://pca-partners.de" target="_blank" rel="noopener" className="text-white/40 hover:text-white/70 transition-colors duration-300">
              pca-partners.de
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] text-white/25 leading-relaxed">
            © 2026 PCA Audit & Tax GmbH WPG StBG. Alle Rechte vorbehalten.
          </p>
          <p className="text-[10px] text-white/15 max-w-[400px]">
            Die Inhalte dieser Seite stellen keine Steuerberatung dar. Betrieben von der PCA Audit & Tax GmbH Wirtschaftsprüfungsgesellschaft Steuerberatungsgesellschaft.
          </p>
        </div>
      </div>
    </footer>
  );
}
