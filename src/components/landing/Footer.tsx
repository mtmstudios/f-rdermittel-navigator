const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

export default function Footer() {
  return (
    <footer style={{ background: "#050505" }} className="dark-section py-14">
      <div className="container-main">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img src={PCA_LOGO} alt="PCA Partners" className="h-6 brightness-0 invert opacity-50" />
            <span className="text-[12px] text-white/30 border-l border-white/8 pl-4 font-medium tracking-wide">
              Forschungszulage
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 leading-relaxed text-center md:text-left">
            © 2026 PCA Partners Steuerberatungs- und Wirtschaftsprüfungsgesellschaft. Alle Rechte vorbehalten.
          </p>
          <p className="text-[10px] text-white/15 text-center md:text-right max-w-[400px]">
            Die Inhalte dieser Seite stellen keine Steuerberatung dar. Die Domain foerderzulage-mittelstand.de wird privat betrieben und ist keine staatliche Stelle.
          </p>
        </div>
      </div>
    </footer>
  );
}
