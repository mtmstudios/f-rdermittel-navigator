import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Cog, FlaskConical, Car, HeartPulse, Lightbulb } from "lucide-react";

const groups = [
  { icon: Code, label: "Software & IT" },
  { icon: Cog, label: "Maschinenbau" },
  { icon: FlaskConical, label: "Chemie & Pharma" },
  { icon: Car, label: "Automotive" },
  { icon: HeartPulse, label: "Medizintechnik" },
  { icon: Lightbulb, label: "Produktinnovation" },
];

/* Double the items for seamless infinite loop */
const marqueeItems = [...groups, ...groups];

export default function TargetGroups() {
  const ref = useScrollAnimation();

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up text-center max-w-[600px] mx-auto mb-10">
          <p className="eyebrow">Branchen</p>
          <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] mb-4 tracking-[-0.02em]">
            Sie müssen kein Labor haben.
          </h2>
          <p className="body-text">
            Förderfähig ist jede systematische Entwicklung — branchenunabhängig.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 animate-marquee"
          style={{ width: "max-content" }}
          aria-hidden="true"
        >
          {marqueeItems.map((g, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-2xl border border-border/60 px-6 py-4 shadow-sm whitespace-nowrap"
            >
              <div className="w-9 h-9 rounded-xl bg-[#307abe]/[0.08] flex items-center justify-center flex-shrink-0">
                <g.icon size={18} className="text-[#307abe]" />
              </div>
              <span className="text-[14px] sm:text-[15px] font-semibold text-foreground">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
