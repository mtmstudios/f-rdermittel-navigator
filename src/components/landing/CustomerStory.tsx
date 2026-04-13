import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import VideoPlayer from "./VideoPlayer";
import { ArrowRight } from "lucide-react";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow block w-full text-center">Praxisbeispiel</p>

          {/* Mobile: text first context, then video. Desktop: Side by side */}
          <div className="grid md:grid-cols-[1fr,1.1fr] gap-8 md:gap-14 items-center">
            {/* Text */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold leading-[1.1] mb-4 md:mb-6 tracking-[-0.02em]">
                Über 250.000 € Forschungszulage
                <span className="block text-[17px] sm:text-[20px] md:text-[26px] font-semibold text-muted-foreground mt-2">
                  — für ein mittelständisches Industrieunternehmen.
                </span>
              </h2>

              <div className="space-y-4 mb-6 md:mb-8">
                <p className="body-text text-[15px]">
                  Das Unternehmen stieß im Produktionsprozess an die Grenzen bestehender Verfahren.
                  Neue Komponenten und Lösungen wurden systematisch entwickelt — für die Geschäftsführung
                  war das normale Produktentwicklung, nicht Forschung.
                </p>
                <p className="body-text text-[15px]">
                  Unsere Wirtschaftsprüfer haben die Aktivitäten fachlich eingeordnet, die förderfähigen
                  Aufwände bewertet und den gesamten Antragsprozess begleitet — von der Bescheinigungsstelle
                  bis zum Finanzamt.
                </p>
              </div>

              {/* Key Figures */}
              <div className="flex justify-center md:justify-start gap-6 sm:gap-8 pt-5 border-t border-border mb-6 md:mb-0">
                <div>
                  <p className="text-[22px] sm:text-[26px] font-bold text-foreground tracking-tight">250.000+ €</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Forschungszulage</p>
                </div>
                <div>
                  <p className="text-[22px] sm:text-[26px] font-bold text-foreground tracking-tight">98 %</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Bewilligungsquote</p>
                </div>
                <div>
                  <p className="text-[22px] sm:text-[26px] font-bold text-foreground tracking-tight">0 €</p>
                  <p className="text-[12px] text-muted-foreground mt-1">Vorabkosten</p>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="order-1 md:order-2">
              <div className="glow-blue">
                <VideoPlayer
                  label="Elias von der Linden erklärt den Case"
                  duration="1:45 Min."
                  variant="dark"
                />
              </div>

              {/* Quote */}
              <blockquote className="mt-5 md:mt-8 text-center md:text-left md:pl-4 md:border-l-2 md:border-[#307abe]/40">
                <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed italic">
                  „Viele Unternehmen schließen sich selbst aus — obwohl sie genau die Art von
                  Entwicklungsarbeit leisten, die förderfähig ist."
                </p>
                <footer className="text-[11px] sm:text-[12px] text-muted-foreground/70 mt-2 not-italic font-medium">
                  — Elias von der Linden, PCA Partners
                </footer>
              </blockquote>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10 md:mt-14">
            <a
              href="#rechner"
              className="inline-flex items-center gap-2 text-[14px] md:text-[15px] font-semibold text-[#307abe] hover:text-[#2968a3] transition-colors"
            >
              Prüfen Sie Ihr eigenes Förderpotenzial
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
