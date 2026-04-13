import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
  "Maschinenbau",
  "Automotive",
  "Medizintechnik",
  "Chemie & Pharma",
  "Elektrotechnik",
  "Produktion & Fertigung",
  "Sonstiges",
];

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const t0 = performance.now();
    function tick(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(start + diff * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = target;
    }
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function fmt(v: number) {
  return v.toLocaleString("de-DE") + " €";
}

export default function CalculatorCard() {
  const [step, setStep] = useState(0);
  const [branche, setBranche] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState(50);
  const [kostenPersonal, setKostenPersonal] = useState(300000);
  const [kostenExtern, setKostenExtern] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const rate = mitarbeiter < 250 ? 0.35 : 0.25;
  const basis = Math.min(kostenPersonal + kostenExtern * 0.6, 4000000);
  const result = Math.min(Math.round((basis * rate) / 100) * 100, 1000000);
  const result3y = result * 3;
  const animResult = useCountUp(showResult ? result : 0);
  const animResult3y = useCountUp(showResult ? result3y : 0);

  return (
    <div id="rechner" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Progress */}
      <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-0">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <p className="text-[13px] sm:text-[14px] font-semibold text-foreground">
            Förder-Rechner
          </p>
          <p className="text-[11px] text-muted-foreground">
            Schritt {Math.min(step + 1, 3)} von 3
          </p>
        </div>
        <div className="flex gap-2 mb-5 sm:mb-6">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-[#307abe]" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 pb-5 sm:pb-7">
        {/* Step 1 — Branche */}
        {step === 0 && (
          <div>
            <h3 className="text-[16px] sm:text-lg font-bold mb-1">Branche</h3>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground mb-4 sm:mb-5">In welchem Bereich ist Ihr Unternehmen tätig?</p>
            <div className="grid grid-cols-2 gap-2">
              {branches.map(b => (
                <button
                  key={b}
                  onClick={() => { setBranche(b); setStep(1); }}
                  className={`rounded-xl border px-3 sm:px-4 py-3 text-[13px] sm:text-[14px] font-medium text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe] ${
                    branche === b
                      ? "border-[#307abe] bg-[#307abe]/5 text-foreground"
                      : "border-gray-100 text-muted-foreground hover:border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Mitarbeiter */}
        {step === 1 && (
          <div>
            <h3 className="text-[16px] sm:text-lg font-bold mb-1">Unternehmensgröße</h3>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground mb-5 sm:mb-6">
              KMU (&lt; 250 MA) erhalten eine höhere Förderquote.
            </p>
            <div className="bg-gray-50 rounded-xl p-5 sm:p-6 mb-5 sm:mb-6">
              <div className="text-center mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">{mitarbeiter}</span>
                <span className="text-[13px] sm:text-[14px] text-muted-foreground ml-2">Mitarbeiter</span>
              </div>
              <input
                type="range" min={1} max={500} value={mitarbeiter}
                onChange={e => setMitarbeiter(Number(e.target.value))}
                className="w-full" aria-label="Mitarbeiterzahl"
              />
              <div className="flex justify-between text-[11px] sm:text-[12px] text-muted-foreground mt-2">
                <span>1</span>
                <span className={`font-semibold ${mitarbeiter < 250 ? "text-[#307abe]" : "text-foreground"}`}>
                  {mitarbeiter < 250 ? "KMU — 35 %" : "Großunternehmen — 25 %"}
                </span>
                <span>500+</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-outline-dark !py-3 !px-4 sm:!px-5 !text-[13px] sm:!text-[14px] !rounded-xl">
                <ArrowLeft size={16} className="mr-1" /> Zurück
              </button>
              <button onClick={() => setStep(2)} className="btn-primary flex-1 !py-3 !text-[13px] sm:!text-[14px] !rounded-xl">
                Weiter <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Kosten */}
        {step === 2 && (
          <div>
            <h3 className="text-[16px] sm:text-lg font-bold mb-1">Entwicklungskosten</h3>
            <p className="text-[13px] sm:text-[14px] text-muted-foreground mb-5 sm:mb-6">
              Geschätzte jährliche Personalkosten in F&E-Projekten.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-3 sm:mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] sm:text-[14px] font-semibold">Personalkosten F&E</span>
                <span className="text-[15px] sm:text-lg font-bold">{fmt(kostenPersonal)}</span>
              </div>
              <input
                type="range" min={50000} max={4000000} step={10000}
                value={kostenPersonal}
                onChange={e => setKostenPersonal(Number(e.target.value))}
                className="w-full" aria-label="Personalkosten F&E"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-muted-foreground mt-1">
                <span>50.000 €</span>
                <span>4.000.000 €</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] sm:text-[14px] font-semibold">
                  Externe F&E <span className="text-muted-foreground font-normal">(optional)</span>
                </span>
                <span className="text-[15px] sm:text-lg font-bold">{fmt(kostenExtern)}</span>
              </div>
              <input
                type="range" min={0} max={2000000} step={10000}
                value={kostenExtern}
                onChange={e => setKostenExtern(Number(e.target.value))}
                className="w-full" aria-label="Externe F&E-Aufträge"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-muted-foreground mt-1">
                <span>0 €</span>
                <span>2.000.000 €</span>
              </div>
              {kostenExtern > 0 && (
                <p className="text-[11px] sm:text-[12px] text-muted-foreground mt-2">
                  Externe Aufträge sind zu 60 % förderfähig.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline-dark !py-3 !px-4 sm:!px-5 !text-[13px] sm:!text-[14px] !rounded-xl">
                <ArrowLeft size={16} className="mr-1" /> Zurück
              </button>
              <button
                onClick={() => { setShowResult(true); fbqTrackOnce(); }}
                className="btn-cta flex-1 !py-3 !text-[13px] sm:!text-[14px] !rounded-xl"
              >
                Berechnen
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="mt-6 sm:mt-8 border-t border-border pt-6 sm:pt-8">
            <div className="text-center mb-5 sm:mb-6">
              <p className="text-[12px] sm:text-[13px] text-muted-foreground mb-2">Geschätztes Förderpotenzial pro Jahr</p>
              <p className="text-[36px] sm:text-[44px] md:text-5xl font-bold text-foreground tracking-tight">{fmt(animResult)}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-gray-50 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
              <div className="text-center">
                <p className="text-[11px] sm:text-[12px] text-muted-foreground mb-1">3 Jahre</p>
                <p className="text-[13px] sm:text-[15px] font-bold">{fmt(animResult3y)}</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-[11px] sm:text-[12px] text-muted-foreground mb-1">Förderquote</p>
                <p className="text-[13px] sm:text-[15px] font-bold">{mitarbeiter < 250 ? "35 %" : "25 %"}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] sm:text-[12px] text-muted-foreground mb-1">Branche</p>
                <p className="text-[13px] sm:text-[15px] font-bold truncate">{branche}</p>
              </div>
            </div>

            <a href="#kontakt" className="btn-cta w-full text-center block !text-[14px] sm:!text-[15px] !rounded-xl">
              Kostenlose Ersteinschätzung anfragen
            </a>
            <p className="text-center text-[11px] sm:text-[12px] text-muted-foreground mt-3">
              Persönliches Gespräch innerhalb von 24 Stunden
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
