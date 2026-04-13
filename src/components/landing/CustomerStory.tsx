import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CustomerStory() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">Praxisbeispiel</p>

          <div className="grid md:grid-cols-[1fr,1.1fr] gap-14 items-center">
            {/* Left — Text */}
            <div>
              <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] mb-6 tracking-[-0.02em]">
                174.000 € Forschungszulage
                <span className="block text-[22px] md:text-[28px] font-semibold text-muted-foreground mt-2">
                  — für einen mittelständischen Industriebetrieb.
                </span>
              </h2>

              <div className="space-y-5 mb-8">
                <p className="body-text">
                  Das Unternehmen hatte Produktionsverfahren weiterentwickelt und neue technische Lösungsansätze erarbeitet. Für die Geschäftsführung war das
                  normale Produktentwicklung — nicht Forschung.
                </p>
                <p className="body-text">
                  Unsere Wirtschaftsprüfer haben die Projekte fachlich eingeordnet, die förderfähigen Kosten bewertet und den gesamten Antragsprozess begleitet.
                </p>
              </div>

              {/* Key Figures */}
              <div className="flex gap-8 pt-6 border-t border-border">
                <div>
                  <p className="text-[28px] font-bold text-foreground tracking-tight">174.000 €</p>
                  <p className="text-[13px] text-muted-foreground mt-1">Forschungszulage erhalten</p>
                </div>
                <div>
                  <p className="text-[28px] font-bold text-foreground tracking-tight">98 %</p>
                  <p className="text-[13px] text-muted-foreground mt-1">Bewilligungsquote</p>
                </div>
              </div>
            </div>

            {/* Right — Video Embed */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden glow-blue">
                {/* Video placeholder — replace with real embed */}
                <div className="bg-gradient-to-br from-[#0a0909] to-[#151520] aspect-video flex items-center justify-center group cursor-pointer relative">
                  {/* Subtle pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px"
                  }} />

                  <div className="text-center relative z-10">
                    <div className="w-[72px] h-[72px] rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/15 group-hover:scale-105 transition-all duration-300">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                    </div>
                    <p className="text-[13px] text-white/40 font-medium">Fallstudie ansehen</p>
                  </div>
                </div>
              </div>

              {/* Quote below video */}
              <blockquote className="mt-8 pl-5 border-l-2 border-[#307abe]/40">
                <p className="text-[15px] text-muted-foreground leading-relaxed italic">
                  „Viele Unternehmen schließen sich selbst aus — obwohl sie genau die Art von Entwicklungsarbeit leisten, die förderfähig ist."
                </p>
                <footer className="text-[13px] text-muted-foreground/70 mt-2 not-italic font-medium">
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
