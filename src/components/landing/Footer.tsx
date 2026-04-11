const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0909" }} className="dark-section py-12">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <img src={PCA_LOGO} alt="PCA Partners" className="h-6 brightness-0 invert opacity-60" />
            <span className="text-[13px] text-white/40 border-l border-white/15 pl-4">Forschungszulage</span>
          </div>
          <div className="flex gap-8 text-[13px]">
            <a href="/impressum" className="text-white/50 hover:text-white/80 transition-colors duration-200">Impressum</a>
            <a href="/datenschutz" className="text-white/50 hover:text-white/80 transition-colors duration-200">Datenschutz</a>
            <a href="https://pca-partners.de" target="_blank" rel="noopener" className="text-white/50 hover:text-white/80 transition-colors duration-200">pca-partners.de</a>
          </div>
        </div>
        <div className="border-t border-white/5 pt-5">
          <p className="text-[11px] text-white/35 text-center">
            © 2026 PCA Partners Steuerberatungs- und Wirtschaftsprüfungsgesellschaft. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
