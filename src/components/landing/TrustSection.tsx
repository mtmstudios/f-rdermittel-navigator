import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";
import { Shield, FileCheck, TrendingUp } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import alexanderImg from "@/assets/alexander-bernauer.png";
import carolinaImg from "@/assets/carolina-kellermann.png";

const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

const credentials = [
  {
    icon: Shield,
    title: "Zugelassene Wirtschaftsprüfungsgesellschaft",
    text: "Jeder Antrag wird auf dem Qualitätsniveau einer Abschlussprüfung erstellt — nicht auf Beraterniveau.",
  },
  {
    icon: FileCheck,
    title: "Prüfungssichere Dokumentation",
    text: "Unsere Anträge sind so aufgebaut, dass sie einer Betriebsprüfung durch das Finanzamt standhalten.",
  },
  {
    icon: TrendingUp,
    title: "Erfolgsbasiertes Honorar",
    text: "Kein Erfolg — keine Kosten. Sie zahlen nur, wenn Sie tatsächlich Förderung erhalten.",
  },
];

/* ── Animated counter that triggers on scroll ── */
function useScrollCounter(target: number, suffix: string, duration = 1200) {
  const [display, setDisplay] = useState(`0${suffix}`);
  const triggered = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const t0 = performance.now();
          function tick(now: number) {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(target * eased);
            setDisplay(`${val.toLocaleString("de-DE")}${suffix}`);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return { display, elRef };
}

export default function TrustSection() {
  const ref = useScrollAnimation();

  const stat1 = useScrollCounter(500, "+");
  const stat2 = useScrollCounter(98, " %");
  const stat3 = useScrollCounter(95000, " €", 1600);

  return (
    <section
      className="section-padding dark-section relative grain overflow-hidden"
      style={{ background: "linear-gradient(170deg, #0a1628 0%, #0d1b30 40%, #0f1f38 100%)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #307abe 0%, transparent 70%)" }}
      />

      <div className="container-main relative" ref={ref}>
        <div className="fade-in-up">
          {/* Header */}
          <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-14">
            <img
              src={PCA_LOGO}
              alt="PCA Partners"
              className="h-8 md:h-10 brightness-0 invert opacity-60 mx-auto mb-6"
            />
            <p className="eyebrow-dark">Ihre Ansprechpartner</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[38px] font-bold text-white leading-[1.1] mb-5 tracking-[-0.02em]">
              Wirtschaftsprüfer.
              <span className="block text-white/50">Nicht nur Berater.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] text-white/50 leading-[1.7]">
              Wir übernehmen den gesamten Antrag — von der fachlichen Einordnung bis
              zur Einreichung beim Finanzamt. Und wir sagen Ihnen vorher ehrlich,
              ob es sich lohnt.
            </p>
          </div>

          {/* People + Credentials — always before video on mobile */}
          <div className="max-w-[960px] mx-auto">

            {/* Team */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-10 md:mb-12">
              <div className="flex items-center gap-3">
                <img
                  src={carolinaImg}
                  alt="Carolina Kellermann"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover object-top border border-white/10"
                />
                <div>
                  <p className="text-[14px] md:text-[15px] font-semibold text-white">Carolina Kellermann</p>
                  <p className="text-[11px] md:text-[12px] text-white/40">Zuständig für Förderungen</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#307abe]/15 flex items-center justify-center border border-white/10">
                  <span className="text-[16px] md:text-[18px] font-bold text-[#57a7dd]">EvdL</span>
                </div>
                <div>
                  <p className="text-[14px] md:text-[15px] font-semibold text-white">Elias von der Linden</p>
                  <p className="text-[11px] md:text-[12px] text-white/40">Forschungs- & Entwicklungszulage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={alexanderImg}
                  alt="Alexander Bernauer"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover object-top border border-white/10"
                />
                <div>
                  <p className="text-[14px] md:text-[15px] font-semibold text-white">Alexander Bernauer</p>
                  <p className="text-[11px] md:text-[12px] text-white/40">Geschäftsführender Gesellschafter</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <p className="text-center text-[12px] text-white/30 mb-8 md:mb-10 font-medium tracking-wide">
              Standorte: München & Passau
            </p>

            {/* Stats row — animated counters */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10 md:mb-12 flex-wrap">
              <div className="flex items-baseline gap-1.5">
                <span ref={stat1.elRef} className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-white tracking-tight tabular-nums">{stat1.display}</span>
                <span className="text-[11px] sm:text-[12px] text-white/40">geprüfte Projekte</span>
              </div>
              <div className="w-px h-6 bg-white/10 hidden sm:block" />
              <div className="flex items-baseline gap-1.5">
                <span ref={stat2.elRef} className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-white tracking-tight tabular-nums">{stat2.display}</span>
                <span className="text-[11px] sm:text-[12px] text-white/40">Bewilligungsquote</span>
              </div>
              <div className="w-px h-6 bg-white/10 hidden sm:block" />
              <div className="flex items-baseline gap-1.5">
                <span ref={stat3.elRef} className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-white tracking-tight tabular-nums">{stat3.display}</span>
                <span className="text-[11px] sm:text-[12px] text-white/40">Ø Fördersumme</span>
              </div>
            </div>

            {/* Video + Credentials Grid */}
            <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 md:gap-12 items-start">
              {/* Credentials — FIRST on mobile */}
              <div className="space-y-4 md:space-y-5 order-1 md:order-2">
                {credentials.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <c.icon size={20} className="text-[#57a7dd]" />
                    </div>
                    <div>
                      <h3 className="text-[15px] md:text-[16px] font-bold text-white mb-1 tracking-[-0.01em]">{c.title}</h3>
                      <p className="text-[13px] md:text-[14px] text-white/45 leading-[1.7]">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WP Erklärvideo — SECOND on mobile */}
              <div className="order-2 md:order-1">
                <div className="glow-blue">
                  <VideoPlayer
                    label="Alexander Bernauer & Elias von der Linden im Gespräch"
                    duration="5:00 Min."
                    variant="dark"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
