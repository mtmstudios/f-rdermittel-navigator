import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import VideoPlayer from "./VideoPlayer";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow text-center">Praxisbeispiel</p>

          {/* Mobile: Video first, then text. Desktop: Side by side */}
          <div className="grid md:grid-cols-[1fr,1.1fr] gap-8 md:gap-14 items-center">
            {/* Text — shows second on mobile */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold leading-[1.1] mb-4 md:mb-6 tracking-[-0.02em]">
                174.000 € Forschungszulage
                <span className="block text-[17px] sm:text-[20px] md:text-[26px] font-semibold text-muted-foreground mt-2">
                  — für einen mittelständischen Industriebetrieb.
                </span>
              </h2>

              <div className="space-y-4 mb-6 md:mb-8">
                <p className="body-text text-[15px]">
                  Das Unternehmen hatte Produktionsverfahren weiterentwickelt. Für die Geschäftsführung war das normale Produktentwicklung — nicht Forschung.
                </p>
                <p className="body-text text-[15px]">
                  Unsere Wirtschaftsprüfer haben die Projekte eingeordnet, förderfähige Kosten bewertet und den gesamten Antragsprozess begleitet.
                </p>
              </div>

              {/* Key Figures */}
              <div className="flex justify-center md:justify-start gap-6 sm:gap-8 pt-5 border-t border-border">
                <div>
                  <p className="text-[22px] sm:text-[26px] font-bold text-foreground tracking-tight">174.000 €</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Forschungszulage</p>
                </div>
                <div>
                  <p className="text-[22px] sm:text-[26px] font-bold text-foreground tracking-tight">98 %</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Bewilligungsquote</p>
                </div>
              </div>
            </div>

            {/* Video — shows first on mobile */}
            <div className="order-1 md:order-2">
              <div className="glow-blue">
                <VideoPlayer
                  /* TODO: Replace with YouTube/Vimeo URL after upload of "Funnel Video.mp4" (5:56) */
                  label="Ausführliche Fallstudie"
                  duration="5:56 Min."
                  variant="dark"
                />
              </div>

              {/* Quote below video */}
              <blockquote className="mt-5 md:mt-8 text-center md:text-left md:pl-4 md:border-l-2 md:border-[#307abe]/40">
                <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed italic">
                  „Viele Unternehmen schließen sich selbst aus — obwohl sie genau die Art von Entwicklungsarbeit leisten, die förderfähig ist."
                </p>
                <footer className="text-[11px] sm:text-[12px] text-muted-foreground/70 mt-2 not-italic font-medium">
                  — PCA Partners, Wirtschaftsprüfer
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
