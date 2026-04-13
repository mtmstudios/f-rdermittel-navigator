import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import VideoPlayer from "./VideoPlayer";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">Praxisbeispiel</p>

          {/* Mobile: Video first, then text. Desktop: Side by side */}
          <div className="grid md:grid-cols-[1fr,1.1fr] gap-8 md:gap-14 items-center">
            {/* Text — shows second on mobile */}
            <div className="order-2 md:order-1">
              <h2 className="text-[26px] sm:text-[30px] md:text-[38px] font-bold leading-[1.1] mb-5 md:mb-6 tracking-[-0.02em]">
                174.000 € Forschungszulage
                <span className="block text-[18px] sm:text-[22px] md:text-[28px] font-semibold text-muted-foreground mt-2">
                  — für einen mittelständischen Industriebetrieb.
                </span>
              </h2>

              <div className="space-y-4 mb-6 md:mb-8">
                <p className="body-text">
                  Das Unternehmen hatte Produktionsverfahren weiterentwickelt und neue technische Lösungsansätze erarbeitet. Für die Geschäftsführung war das normale Produktentwicklung — nicht Forschung.
                </p>
                <p className="body-text">
                  Unsere Wirtschaftsprüfer haben die Projekte fachlich eingeordnet, die förderfähigen Kosten bewertet und den gesamten Antragsprozess begleitet.
                </p>
              </div>

              {/* Key Figures */}
              <div className="flex gap-6 sm:gap-8 pt-5 md:pt-6 border-t border-border">
                <div>
                  <p className="text-[24px] sm:text-[28px] font-bold text-foreground tracking-tight">174.000 €</p>
                  <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-1">Forschungszulage erhalten</p>
                </div>
                <div>
                  <p className="text-[24px] sm:text-[28px] font-bold text-foreground tracking-tight">98 %</p>
                  <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-1">Bewilligungsquote</p>
                </div>
              </div>
            </div>

            {/* Video — shows first on mobile */}
            <div className="order-1 md:order-2">
              <div className="glow-blue">
                <VideoPlayer
                  /* TODO: Replace with YouTube/Vimeo URL after upload of "Funnel Video.mp4" */
                  label="Fallstudie ansehen"
                  duration="5:56 Min."
                  variant="dark"
                />
              </div>

              {/* Quote below video */}
              <blockquote className="mt-6 md:mt-8 pl-4 md:pl-5 border-l-2 border-[#307abe]/40">
                <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed italic">
                  „Viele Unternehmen schließen sich selbst aus — obwohl sie genau die Art von Entwicklungsarbeit leisten, die förderfähig ist."
                </p>
                <footer className="text-[12px] sm:text-[13px] text-muted-foreground/70 mt-2 not-italic font-medium">
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
