import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function Datenschutz() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container-main max-w-[720px]">
          <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="body-text space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-2">1. Verantwortlicher</h2>
              <p>
                factonet Holding GmbH
                <br />
                [Adresse einsetzen]
                <br />
                E-Mail: info@factonet.de
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>
                Wenn Sie unser Kontaktformular nutzen, erheben wir folgende Daten: Vorname, Nachname, E-Mail-Adresse, Telefonnummer, Unternehmen, Mitarbeiterzahl und Angaben zur Entwicklungstätigkeit. Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme verwendet.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">3. Meta Pixel (Facebook)</h2>
              <p>
                Diese Website nutzt das Meta Pixel von Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland. Dadurch können wir die Wirksamkeit unserer Werbeanzeigen auf Facebook und Instagram nachvollziehen.
              </p>
              <p>
                Dabei werden Daten an Meta übermittelt und dort verarbeitet. Weitere Informationen finden Sie in der Datenschutzerklärung von Meta: <a href="https://www.facebook.com/privacy/policy/" className="text-accent underline" target="_blank" rel="noopener noreferrer">facebook.com/privacy/policy</a>.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">4. Weitergabe an Dritte</h2>
              <p>
                Ihre Daten werden an PCA Partners (Wirtschaftsprüfungsgesellschaft) weitergeleitet, sofern Ihre Anfrage eine weitergehende Beratung erfordert. Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p>
                Eine darüber hinausgehende Weitergabe an Dritte findet nicht statt, es sei denn, wir sind gesetzlich dazu verpflichtet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">5. Speicherdauer</h2>
              <p>
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie dies für die Bearbeitung Ihrer Anfrage erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">6. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Zudem haben Sie das Recht auf Datenübertragbarkeit sowie das Recht, Beschwerde bei einer Aufsichtsbehörde einzureichen.
              </p>
              <p>
                Zur Ausübung Ihrer Rechte wenden Sie sich an: info@factonet.de
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">7. Hosting</h2>
              <p>
                Diese Website wird über Lovable / Netlify gehostet. Die Server befinden sich in der EU. Weitere Informationen finden Sie in der Datenschutzerklärung des jeweiligen Anbieters.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
