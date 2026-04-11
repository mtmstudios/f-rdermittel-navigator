import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calculator as CalcIcon, ArrowRight, Info } from "lucide-react";

const fbqTrackOnce = (() => {
  let fired = false;
  return () => {
    if (fired) return;
    fired = true;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Förder-Rechner Ergebnis",
        content_category: "calculator",
      });
    }
  };
})();

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

function useCountUp(target: number, duration = 1200) {
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
  return v.toLocaleString("de-DE") + " €";
}

function formatCurrencyShort(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1).replace(".", ",") + " Mio. €";
  if (v >= 1000) return Math.round(v / 1000) + ".000 €";
  return v + " €";
}

export default function Calculator() {
  const ref = useScrollAnimation();
  const [step, setStep] = useState(0);
  const [branche, setBranche] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState(50);
  const [kostenPersonal, setKostenPersonal] = useState(300000);
  const [kostenExtern, setKostenExtern] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const rate = mitarbeiter < 250 ? 0.35 : 0.25;
  const bemessungsgrundlage = Math.min(kostenPersonal + kostenExtern * 0.6, 4000000);
  const raw = Math.round((bemessungsgrundlage * rate) / 100) * 100;
  const result = Math.min(raw, 1000000);
  const result3y = result * 3;
  const animatedResult = useCountUp(showResult ? result : 0);
  const animatedResult3y = useCountUp(showResult ? result3y : 0);

  const handleCalculate = () => {
    setShowResult(true);
    fbqTrackOnce();
  };

  const canCalculate = branche !== "";

  return (
    <section id="rechner" className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(220 35% 12%) 0%, hsl(220 30% 18%) 100%)",
      }}
    >
      {/* Subtle accent glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(168 80% 36%) 0%, transparent 70%)" }}
      />

      <div className="container-main relative dark-section" ref={ref}>
        <div className="fade-in-up text-center mb-12">
          <p className="eyebrow">FÖRDER-RECHNER</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-white">
            Prüfen Sie Ihr Förderpotenzial
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Unverbindliche Erstschätzung basierend auf Ihren Eckdaten — in unter 60 Sekunden.
          </p>
        </div>

        <div className="fade-in-up max-w-[840px] mx-auto">
          {/* Calculator card */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-8">
              {["Branche", "Unternehmen", "Entwicklungskosten"].map((label, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i <= step ? "bg-accent text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline transition-colors ${
                    i <= step ? "text-foreground" : "text-gray-300"
                  }`}>{label}</span>
                  {i < 2 && <div className={`flex-1 h-0.5 rounded transition-colors ${i < step ? "bg-accent" : "bg-gray-100"}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Branche */}
            <div className={step === 0 ? "block" : "hidden"}>
              <label className="block text-sm font-semibold text-foreground mb-3">
                In welcher Branche ist Ihr Unternehmen tätig?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {branches.map((b) => (
                  <button
                    key={b}
                    onClick={() => { setBranche(b); setStep(1); }}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-medium text-center transition-all ${
                      branche === b
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-gray-100 text-gray-600 hover:border-accent/30 hover:bg-accent/5"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Mitarbeiter */}
            <div className={step === 1 ? "block" : "hidden"}>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Wie viele Mitarbeiter hat Ihr Unternehmen?
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                Die Förderhöhe hängt von der Unternehmensgröße ab: KMU erhalten 35 %, größere Unternehmen 25 %.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={mitarbeiter}
                  onChange={(e) => setMitarbeiter(Number(e.target.value))}
                  className="w-full mb-4"
                  aria-label="Mitarbeiterzahl"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">1</span>
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-foreground">{mitarbeiter}</span>
                    <span className="text-sm text-muted-foreground ml-2">Mitarbeiter</span>
                  </div>
                  <span className="text-sm text-muted-foreground">500+</span>
                </div>
                <div className="mt-3 flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 ${
                    mitarbeiter < 250
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {mitarbeiter < 250 ? "KMU — 35 % Förderquote" : "Großunternehmen — 25 % Förderquote"}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-ghost-dark !py-3 !px-6 !text-sm">Zurück</button>
                <button onClick={() => setStep(2)} className="btn-primary flex-1 !text-sm">Weiter <ArrowRight size={16} className="ml-1" /></button>
              </div>
            </div>

            {/* Step 3: Kosten */}
            <div className={step === 2 ? "block" : "hidden"}>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Geschätzte jährliche Entwicklungskosten
              </label>
              <p className="text-sm text-muted-foreground mb-5">
                Personalkosten für Mitarbeiter, die an Entwicklung, Verbesserung oder Innovation arbeiten.
              </p>

              {/* Personalkosten */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">Personalkosten F&E</span>
                  <span className="text-xl font-extrabold text-accent">{formatCurrencyShort(kostenPersonal)}</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={4000000}
                  step={10000}
                  value={kostenPersonal}
                  onChange={(e) => setKostenPersonal(Number(e.target.value))}
                  className="w-full"
                  aria-label="Jährliche Personalkosten F&E"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50.000 €</span>
                  <span>4.000.000 €</span>
                </div>
              </div>

              {/* Externe Kosten */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Externe F&E-Aufträge</span>
                    <span className="text-xs text-muted-foreground">(optional)</span>
                  </div>
                  <span className="text-xl font-extrabold text-accent">{formatCurrencyShort(kostenExtern)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2000000}
                  step={10000}
                  value={kostenExtern}
                  onChange={(e) => setKostenExtern(Number(e.target.value))}
                  className="w-full"
                  aria-label="Externe F&E-Aufträge"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 €</span>
                  <span>2.000.000 €</span>
                </div>
                {kostenExtern > 0 && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Info size={12} /> Externe Aufträge sind zu 60 % förderfähig
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost-dark !py-3 !px-6 !text-sm">Zurück</button>
                <button
                  onClick={handleCalculate}
                  disabled={!canCalculate}
                  className="btn-primary flex-1 !text-sm disabled:opacity-50"
                >
                  <CalcIcon size={16} className="mr-2" /> Förderpotenzial berechnen
                </button>
              </div>
            </div>

            {/* Ergebnis */}
            {showResult && (
              <div className="mt-8 rounded-2xl overflow-hidden border-2 border-accent/20">
                {/* Dark result header */}
                <div className="p-6 md:p-8 text-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(220 35% 14%) 0%, hsl(220 30% 20%) 100%)",
                  }}
                >
                  <p className="text-sm font-medium text-white/50 mb-2">Ihr geschätztes Förderpotenzial</p>
                  <p className="text-5xl md:text-6xl font-extrabold text-white mb-1">
                    {formatCurrency(animatedResult)}
                  </p>
                  <p className="text-lg text-accent font-semibold">pro Jahr</p>
                </div>

                {/* Details */}
                <div className="bg-accent/5 p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">3-Jahres-Potenzial</p>
                      <p className="text-lg font-bold text-foreground">{formatCurrency(animatedResult3y)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Förderquote</p>
                      <p className="text-lg font-bold text-foreground">{mitarbeiter < 250 ? "35 %" : "25 %"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Branche</p>
                      <p className="text-lg font-bold text-foreground">{branche}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 bg-white border-t border-border">
                  <a
                    href="#kontakt"
                    className="btn-primary w-full text-center block !text-base"
                  >
                    Jetzt kostenlos prüfen lassen →
                  </a>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Unverbindliches Gespräch in 24h — kein Risiko, keine Kosten
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-white/30 mt-5 max-w-[600px] mx-auto">
            * Unverbindliche Erstschätzung. Keine Steuerberatung. Das tatsächliche Förderpotenzial hängt von der individuellen Prüfung Ihrer Projekte ab.
          </p>
        </div>
      </div>
    </section>
  );
}
