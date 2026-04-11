import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding section-alt">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">Referenz</p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-[32px] font-bold leading-tight mb-6">
                174.000 € Forschungszulage — für einen Seifenhersteller.
              </h2>
              <div className="body-text space-y-4">
                <p>
                  Ein mittelständischer Industriebetrieb hatte eine bestehende Produktlinie weiterentwickelt — inklusive Anpassungen im Herstellungsprozess.
                </p>
                <p>
                  Für die Geschäftsführung war das normale Produktentwicklung. Nicht Forschung.
                </p>
                <p>
                  Wir haben die Entwicklungsprojekte strukturiert aufbereitet, die förderfähigen Kosten bewertet und den gesamten Antragsprozess begleitet.
                </p>
              </div>
            </div>

            <div>
              {/* Video placeholder */}
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-6 border border-border">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <svg className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-muted-foreground">Video folgt</p>
                </div>
              </div>

              <blockquote className="border-l-2 border-foreground pl-5">
                <p className="text-[16px] font-medium text-foreground leading-relaxed mb-3">
                  „Wir hätten nie gedacht, dass unsere Produktentwicklung als Forschung zählt."
                </p>
                <footer className="text-[13px] text-muted-foreground">
                  — Geschäftsführer, mittelständischer Industriebetrieb
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
