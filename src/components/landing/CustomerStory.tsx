import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center mb-12">
            <p className="eyebrow">AUS DER PRAXIS</p>
            <h2 className="text-2xl md:text-4xl font-bold">
              €174.000 Forschungszulage — für einen Seifenhersteller.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start max-w-[1000px] mx-auto">
            <div className="body-text space-y-4">
              <p>
                Ein mittelständischer Industriebetrieb hatte eine bestehende Produktlinie weiterentwickelt und eine Seife in eine neuartige physische Form gebracht — inklusive Anpassungen im Herstellungsprozess.
              </p>
              <p>
                Für die Geschäftsführung war das normale Produktentwicklung. <strong className="text-foreground">Nicht Forschung.</strong>
              </p>
              <p>
                Wir haben die Entwicklungsprojekte strukturiert aufbereitet, die förderfähigen Kosten bewertet und den gesamten Antragsprozess begleitet.
              </p>
              <p className="font-bold text-foreground text-xl">
                Das Ergebnis: €174.000 Forschungszulage.
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-8">
                <Quote className="text-accent/20 mb-4" size={40} />
                <blockquote className="text-lg font-semibold text-foreground mb-4 leading-relaxed">
                  Wir hätten nie gedacht, dass unsere Produktentwicklung als Forschung zählt. Die Begleitung war absolut professionell.
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">GF</div>
                  <div>
                    <p className="text-sm font-semibold">Geschäftsführer</p>
                    <p className="text-xs text-muted-foreground">Mittelständischer Industriebetrieb</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 left-8 bg-accent text-white text-sm font-bold rounded-full px-5 py-2 shadow-lg">
                €174.000 bewilligt
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
