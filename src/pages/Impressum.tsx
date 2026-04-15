import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function Impressum() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container-main max-w-[720px]">
          <h1 className="text-3xl font-bold mb-8">Impressum</h1>

          <div className="body-text space-y-4">
            <p>
              <strong>PCA Advisory &amp; Services GmbH StBG</strong>
              <br />
              Kachletstraße 36
              <br />
              94034 Passau
              <br />
              Deutschland
            </p>

            <p>
              <strong>Geschäftsführer:</strong>
              <br />
              Alexander Bernauer
            </p>

            <p>
              <strong>Kontakt:</strong>
              <br />
              Telefon: +49 851 987 959 0
              <br />
              E-Mail: info@pca-partners.de
            </p>

            <p>
              <strong>Handelsregister:</strong>
              <br />
              HRB 12664 — Amtsgericht Passau
            </p>

            <p>
              <strong>Umsatzsteuer-Identifikationsnummer:</strong>
              <br />
              DE 295 276 283
            </p>

            <h2 className="text-xl font-bold mt-10 mb-3">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#307abe] hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-3">Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-3">Haftung für Inhalte</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Dienstanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Dienstanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-3">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-3">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten bzw. verwendeten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <p className="text-[13px] text-muted-foreground mt-10 pt-6 border-t border-border">
              Die auf dieser Website bereitgestellten Informationen stellen keine Steuerberatung dar und ersetzen nicht die individuelle Beratung durch einen Steuerberater oder Wirtschaftsprüfer.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
