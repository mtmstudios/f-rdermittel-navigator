import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Shield, FileCheck, TrendingUp } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

const credentials = [
  {
    icon: Shield,
    title: "Zugelassene WPG",
    text: "PCA Partners ist eine Wirtschaftsprüfungsgesellschaft — jeder Antrag wird auf Prüfungsniveau erstellt.",
  },
  {
    icon: FileCheck,
    title: "Prüfungssichere Anträge",
    text: "Unsere Dokumentation hält jeder Betriebsprüfung stand. Wir denken den Prüfer mit.",
  },
  {
    icon: TrendingUp,
    title: "Erfolgsbasiert",
    text: "Kein Erfolg — keine Kosten. Unser Honorar orientiert sich am tatsächlichen Ergebnis.",
  },
];

export default function TrustSection() {
  const ref = useScrollAnimation();

  return (
    <section
      className="section-padding dark-section relative grain overflow-hidden"
      style={{ background: "linear-gradient(170deg, #050505 0%, #0d0d0f 40%, #0f1118 100%)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #307abe 0%, transparent 70%)" }}
      />

      <div className="container-main relative" ref={ref}>
        <div className="fade-in-up">
          {/* Header with Logo */}
          <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-14">
            <img
              src={PCA_LOGO}
              alt="PCA Partners"
              className="h-8 md:h-10 brightness-0 invert opacity-60 mx-auto mb-6"
            />
            <p className="eyebrow-dark">Wirtschaftsprüfungsgesellschaft</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[38px] font-bold text-white leading-[1.1] mb-5 tracking-[-0.02em]">
              Wirtschaftsprüfer.
              <span className="block text-white/50">Nicht nur Berater.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] text-white/50 leading-[1.7]">
              Wir verbinden steuerrechtliche Expertise mit technischem Projektverständnis —
              und setzen jeden Antrag so auf, dass er einer Betriebsprüfung standhält.
            </p>
          </div>

          {/* Video + Credentials Grid */}
          <div className="max-w-[960px] mx-auto grid md:grid-cols-[1.2fr,1fr] gap-8 md:gap-12 items-center">
            {/* WP Erklärvideo */}
            <div className="glow-blue">
              <VideoPlayer
                label="Wirtschaftsprüfer erklärt Forschungszulage"
                duration="5:00 Min."
                variant="dark"
              />
            </div>

            {/* Credentials */}
            <div className="space-y-4 md:space-y-5">
              {credentials.map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <c.icon size={20} className="text-[#57a7dd]" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-white mb-1 tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-[14px] text-white/45 leading-[1.7]">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
