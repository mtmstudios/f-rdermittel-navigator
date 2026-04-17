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
                250.000 € Forschungszulage
                <span className="block text-[17px] sm:text-[20px] md:text-[26px] font-semibold text-muted-foreground mt-2">
                  für einen Maschinenbauer aus Süddeutschland.
                </span>
              </h2>

              <div className="space-y-4 mb-6 md:mb-8">
                <p className="body-text text-[15px]">
                  Das Unternehmen entwickelte neue Fertigungsverfahren, um bestehende
                  Produktionsgrenzen zu überwinden. Klassische Ingenieurarbeit — intern
                  nie als „Forschung" eingestuft.
                </p>
                <p className="body-text text-[15px]">
                  Wir haben die Projekte fachlich eingeordnet, die Förderfähigkeit bewertet
                  und den Antrag prüfungssicher aufbereitet. Ergebnis: Bewilligung in voller Höhe,
                  rückwirkend für drei Geschäftsjahre.
                </p>
              </div>

              {/* Key Figures — 3-column grid with dividers */}
              <div className="grid grid-cols-3 items-start pt-6 border-t border-border mb-6 md:mb-0">
                <div className="text-center md:text-left pr-3 md:pr-6">
                  <p className="text-[19px] sm:text-[22px] md:text-[26px] font-extrabold text-foreground tracking-tight leading-none">250.000+&nbsp;€</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1.5 font-medium leading-tight">bewilligte Förderung</p>
                </div>
                <div className="text-center px-3 md:px-6 border-x border-border">
                  <p className="text-[19px] sm:text-[22px] md:text-[26px] font-extrabold text-foreground tracking-tight leading-none">3 Jahre</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1.5 font-medium leading-tight">rückwirkend</p>
                </div>
                <div className="text-center md:text-right pl-3 md:pl-6">
                  <p className="text-[19px] sm:text-[22px] md:text-[26px] font-extrabold text-foreground tracking-tight leading-none">100&nbsp;%</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1.5 font-medium leading-tight">erfolgsbasiert</p>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="order-1 md:order-2">
              <div className="glow-blue">
                <VideoPlayer
                  label="Alexander Bernauer erklärt den Case"
                  duration="1:45 Min."
                  variant="dark"
                />
              </div>

              {/* Quote */}
              <blockquote className="mt-5 md:mt-8 text-center md:text-left pl-4 border-l-2 border-[#307abe]/30">
                <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed italic">
                  „Die meisten Unternehmen wissen nicht, dass ihre tägliche Entwicklungsarbeit
                  förderfähig ist. Genau das prüfen wir."
                </p>
                <footer className="text-[11px] sm:text-[12px] text-muted-foreground/70 mt-2 not-italic font-medium">
                  — Alexander Bernauer, PCA Partners
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
