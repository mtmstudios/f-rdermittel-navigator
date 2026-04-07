import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const branches = [
  "Software & IT",
  "Maschinenbau & Produktion",
  "Automotive & Zulieferer",
  "Medizintechnik",
  "Chemie & Pharma",
  "Elektrotechnik",
  "Sonstige Fertigung",
  "Sonstiges",
];

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = target;
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}

function formatCurrency(v: number) {
  return "€" + v.toLocaleString("de-DE");
}

export default function Calculator() {
  const ref = useScrollAnimation();
  const [branche, setBranche] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState(50);
  const [kosten, setKosten] = useState(250000);

  const rate = mitarbeiter < 250 ? 0.35 : 0.25;
  const raw = Math.round((kosten * rate) / 1000) * 1000;
  const result = Math.min(raw, 1000000);
  const hasResult = branche !== "";
  const animatedResult = useCountUp(hasResult ? result : 0);

  return (
    <section id="rechner" className="section-alt section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up text-center mb-10">
          <p className="eyebrow">FÖRDER-RECHNER</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            Prüfen Sie Ihr Förderpotenzial in 30 Sekunden
          </h2>
          <p className="body-text">Unverbindliche Erstschätzung basierend auf Ihren Eckdaten.</p>
        </div>

        <div className="fade-in-up max-w-[720px] mx-auto bg-card rounded-2xl border border-border p-6 md:p-10" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {/* Branche */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="branche">
              In welcher Branche sind Sie tätig?
            </label>
            <select
              id="branche"
              value={branche}
              onChange={(e) => setBranche(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Branche wählen"
            >
              <option value="">Branche wählen...</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Mitarbeiter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="mitarbeiter">
              Wie viele Mitarbeiter hat Ihr Unternehmen?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="mitarbeiter"
                min={5}
                max={500}
                value={mitarbeiter}
                onChange={(e) => setMitarbeiter(Number(e.target.value))}
                className="flex-1 accent-accent"
                aria-label="Mitarbeiterzahl"
              />
              <span className="text-lg font-semibold min-w-[120px] text-right">
                {mitarbeiter} Mitarbeiter
              </span>
            </div>
          </div>

          {/* Kosten */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-1" htmlFor="kosten">
              Wie hoch sind Ihre jährlichen Entwicklungskosten (geschätzt)?
            </label>
            <p className="text-sm text-muted-foreground mb-2">
              Personalkosten für Mitarbeiter die an Entwicklung, Verbesserung oder Innovation arbeiten.
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="kosten"
                min={50000}
                max={5000000}
                step={10000}
                value={kosten}
                onChange={(e) => setKosten(Number(e.target.value))}
                className="flex-1 accent-accent"
                aria-label="Jährliche Entwicklungskosten"
              />
              <span className="text-lg font-semibold min-w-[140px] text-right">
                {formatCurrency(kosten)}
              </span>
            </div>
          </div>

          {/* Ergebnis */}
          {hasResult && (
            <div className="bg-accent-light border border-accent rounded-xl p-6 text-center mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Ihr geschätztes Förderpotenzial:</p>
              <p className="text-5xl font-extrabold text-accent mb-1">
                {formatCurrency(animatedResult)} / Jahr
              </p>
              <p className="text-base text-muted-foreground">
                Das entspricht bis zu {formatCurrency(result * 3)} über 3 Jahre
              </p>
              {/* META PIXEL: ViewContent (Rechner Ergebnis) */}
            </div>
          )}

          <a href="#kontakt" className="btn-primary w-full text-center block">
            Jetzt kostenlos prüfen lassen →
          </a>
        </div>

        <p className="text-center text-xs text-muted-foreground italic mt-4 max-w-[720px] mx-auto">
          * Unverbindliche Erstschätzung. Keine Steuerberatung. Das tatsächliche Förderpotenzial hängt von der individuellen Prüfung Ihrer Projekte ab.
        </p>
      </div>
    </section>
  );
}
