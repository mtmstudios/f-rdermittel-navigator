import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Shield, FileCheck, TrendingUp, User } from "lucide-react";

const points = [
  {
    icon: Shield,
    title: "Wirtschaftsprüfungsgesellschaft",
    text: "PCA Partners ist eine zugelassene WPG — nicht nur eine Beratung. Jeder Antrag wird auf dem Qualitätsniveau einer Abschlussprüfung erstellt.",
  },
  {
    icon: FileCheck,
    title: "Prüfungssichere Dokumentation",
    text: "Unsere Anträge sind so aufgebaut, dass sie einer Betriebsprüfung standhalten. Wir denken den Prüfer mit.",
  },
  {
    icon: TrendingUp,
    title: "Überwiegend erfolgsabhängiges Honorar",
    text: "Einmalige Aufwandsentschädigung für die Erstprüfung. Danach orientiert sich unser Honorar am tatsächlichen Ergebnis.",
  },
  {
    icon: User,
    title: "Persönliche Betreuung",
    text: "Ein fester Ansprechpartner für Ihr gesamtes Projekt. Keine wechselnden Kontakte, keine Call-Center.",
  },
];

export default function WhyUs() {
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
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <p className="eyebrow-dark">Warum PCA Partners</p>
            <h2 className="text-[28px] md:text-[38px] font-bold text-white leading-[1.1] mb-5 tracking-[-0.02em]">
              Wirtschaftsprüfer.
              <span className="block text-white/50">Nicht nur Berater.</span>
            </h2>
            <p className="text-[17px] text-white/50 leading-[1.7]">
              Wir verbinden steuerrechtliche Expertise mit technischem Projektverständnis — und setzen jeden Antrag so auf, dass er einer Betriebsprüfung standhält.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {points.map((p, i) => (
              <div key={i} className="glass-card group text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-[#307abe]/10 flex items-center justify-center mb-5 mx-auto sm:mx-0 group-hover:bg-[#307abe]/15 transition-colors duration-300">
                  <p.icon size={20} className="text-[#57a7dd]" />
                </div>
                <h3 className="text-[17px] font-bold text-white mb-3 tracking-[-0.01em]">{p.title}</h3>
                <p className="text-[15px] text-white/45 leading-[1.7]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
