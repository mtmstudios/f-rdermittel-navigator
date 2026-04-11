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
              <strong>factonet Holding GmbH</strong>
              <br />
              {/* ADRESSE HIER EINSETZEN */}
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              Deutschland
            </p>

            <p>
              <strong>Vertreten durch:</strong>
              <br />
              Constantin Seretoulis, Geschäftsführer
            </p>

            <p>
              <strong>Kontakt:</strong>
              <br />
              E-Mail: info@factonet.de
              <br />
              Telefon: [Telefonnummer einsetzen]
            </p>

            <p>
              <strong>Handelsregister:</strong>
              <br />
              [Registergericht], HRB [Nummer]
            </p>

            <p>
              <strong>Umsatzsteuer-Identifikationsnummer:</strong>
              <br />
              DE [Nummer]
            </p>

            <p>
              <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
              <br />
              Constantin Seretoulis
              <br />
              [Adresse wie oben]
            </p>

            <h2 className="text-xl font-bold mt-8 mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p>
              Die auf dieser Website bereitgestellten Informationen stellen keine Steuerberatung dar und ersetzen nicht die individuelle Beratung durch einen Steuerberater oder Wirtschaftsprüfer.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
