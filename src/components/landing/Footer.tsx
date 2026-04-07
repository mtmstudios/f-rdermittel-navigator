export default function Footer() {
  return (
    <footer className="bg-dark-bg text-muted-foreground py-10">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <p className="text-sm">© 2026 factonet. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 text-sm">
            <a href="/impressum" className="hover:text-background transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-background transition-colors">Datenschutz</a>
          </div>
        </div>
        <p className="text-xs text-center opacity-60">
          Privates Beratungsangebot. Keine staatliche Stelle.
        </p>
      </div>
    </footer>
  );
}
