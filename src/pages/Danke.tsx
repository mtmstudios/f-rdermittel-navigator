import { CheckCircle } from "lucide-react";

// META PIXEL: Lead (Danke-Seite)

export default function Danke() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-[600px] text-center">
        <CheckCircle className="text-accent mx-auto mb-6" size={64} />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Vielen Dank für Ihre Anfrage!
        </h1>
        <p className="body-text mb-4">
          Einer unserer Berater wird sich innerhalb von 24 Stunden bei Ihnen melden, um Ihre Situation zu besprechen.
        </p>
        <p className="body-text mb-8">
          In der Zwischenzeit haben wir Ihnen eine E-Mail mit ersten Informationen zur Forschungszulage geschickt.
        </p>
        <a href="/" className="btn-ghost">
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
}
