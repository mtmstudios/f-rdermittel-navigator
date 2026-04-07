import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">AUS DER PRAXIS</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-10">
            €174.000 Forschungszulage — für einen Seifenhersteller.
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="body-text space-y-4">
              <p>
                Ein mittelständischer Industriebetrieb hatte eine bestehende Produktlinie weiterentwickelt und eine Seife in eine neuartige physische Form gebracht — inklusive Anpassungen im Herstellungsprozess.
              </p>
              <p>
                Für die Geschäftsführung war das normale Produktentwicklung. Nicht Forschung.
              </p>
              <p>
                Wir haben die Entwicklungsprojekte strukturiert aufbereitet, die förderfähigen Kosten bewertet und den gesamten Antragsprozess begleitet.
              </p>
              <p className="font-semibold text-foreground">
                Das Ergebnis: €174.000 Forschungszulage.
              </p>
            </div>

            <div className="bg-primary-light border-l-4 border-primary rounded-xl p-8 relative">
              <span className="text-6xl text-primary/20 font-serif absolute top-4 left-6">"</span>
              <blockquote className="text-lg font-medium text-foreground mt-6 mb-4">
                Wir hätten nie gedacht, dass unsere Produktentwicklung als Forschung zählt.
              </blockquote>
              <p className="text-sm text-muted-foreground mb-4">
                — Geschäftsführer, mittelständischer Industriebetrieb
              </p>
              <span className="inline-block bg-accent text-accent-foreground text-sm font-semibold rounded-full px-4 py-1.5">
                €174.000 bewilligt
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
