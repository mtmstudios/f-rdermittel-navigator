import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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

export default function Calculator() {
  const ref = useScrollAnimation();
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
    <section
      id="rechner"
      className="section-padding dark-section"
      style={{ background: "hsl(222 47% 11%)" }}
    >
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center mb-12">
            <p className="eyebrow-dark">Förder-Rechner</p>
            <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-3">
              Unverbindliche Erstschätzung
            </h2>
            <p className="text-[16px] text-white/40 max-w-md mx-auto">
              Berechnen Sie in wenigen Schritten Ihr mögliches Förderpotenzial.
            </p>
          </div>

          <div className="max-w-[700px] mx-auto bg-white rounded-lg shadow-xl">
            {/* Progress */}
            <div className="px-8 pt-8 pb-0">
              <div className="flex gap-2 mb-8">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-[hsl(222,47%,16%)]" : "bg-gray-100"}`} />
                ))}
              </div>
            </div>

            <div className="px-8 pb-8">
              {/* Step 1 */}
              {step === 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-1">Branche</h3>
                  <p className="text-[14px] text-muted-foreground mb-5">In welchem Bereich ist Ihr Unternehmen tätig?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {branches.map(b => (
                      <button
                        key={b}
                        onClick={() => { setBranche(b); setStep(1); }}
                        className={`rounded-lg border px-4 py-3 text-[14px] font-medium text-left transition-all ${
                          branche === b
                            ? "border-[hsl(222,47%,16%)] bg-[hsl(222,47%,96%)] text-foreground"
                            : "border-gray-100 text-muted-foreground hover:border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-bold mb-1">Unternehmensgröße</h3>
                  <p className="text-[14px] text-muted-foreground mb-6">
                    KMU (&lt; 250 Mitarbeiter) erhalten eine höhere Förderquote.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-foreground">{mitarbeiter}</span>
                      <span className="text-[14px] text-muted-foreground ml-2">Mitarbeiter</span>
                    </div>
                    <input
                      type="range" min={1} max={500} value={mitarbeiter}
                      onChange={e => setMitarbeiter(Number(e.target.value))}
                      className="w-full" aria-label="Mitarbeiterzahl"
                    />
                    <div className="flex justify-between text-[12px] text-muted-foreground mt-2">
                      <span>1</span>
                      <span className={`font-semibold ${mitarbeiter < 250 ? "text-[hsl(173,58%,39%)]" : "text-foreground"}`}>
                        {mitarbeiter < 250 ? "KMU — 35 % Förderquote" : "Großunternehmen — 25 %"}
                      </span>
                      <span>500+</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="btn-outline-dark !py-3 !px-5 !text-[14px]">
                      <ArrowLeft size={16} className="mr-1" /> Zurück
                    </button>
                    <button onClick={() => setStep(2)} className="btn-primary flex-1 !py-3 !text-[14px]">
                      Weiter <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 2 && (
                <div>
                  <h3 className="text-lg font-bold mb-1">Entwicklungskosten</h3>
                  <p className="text-[14px] text-muted-foreground mb-6">
                    Geschätzte jährliche Personalkosten für Mitarbeiter in F&E-Projekten.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-5 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[14px] font-semibold">Personalkosten F&E</span>
                      <span className="text-lg font-bold">{fmt(kostenPersonal)}</span>
                    </div>
                    <input
                      type="range" min={50000} max={4000000} step={10000}
                      value={kostenPersonal}
                      onChange={e => setKostenPersonal(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                      <span>50.000 €</span>
                      <span>4.000.000 €</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[14px] font-semibold">
                        Externe F&E-Aufträge <span className="text-muted-foreground font-normal">(optional)</span>
                      </span>
                      <span className="text-lg font-bold">{fmt(kostenExtern)}</span>
                    </div>
                    <input
                      type="range" min={0} max={2000000} step={10000}
                      value={kostenExtern}
                      onChange={e => setKostenExtern(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                      <span>0 €</span>
                      <span>2.000.000 €</span>
                    </div>
                    {kostenExtern > 0 && (
                      <p className="text-[12px] text-muted-foreground mt-2">
                        Externe Aufträge sind zu 60 % förderfähig.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline-dark !py-3 !px-5 !text-[14px]">
                      <ArrowLeft size={16} className="mr-1" /> Zurück
                    </button>
                    <button
                      onClick={() => { setShowResult(true); fbqTrackOnce(); }}
                      className="btn-primary flex-1 !py-3 !text-[14px]"
                    >
                      Berechnen
                    </button>
                  </div>
                </div>
              )}

              {/* Result */}
              {showResult && (
                <div className="mt-8 border-t border-border pt-8">
                  <div className="text-center mb-6">
                    <p className="text-[13px] text-muted-foreground mb-2">Geschätztes Förderpotenzial pro Jahr</p>
                    <p className="text-4xl md:text-5xl font-bold text-foreground">{fmt(animResult)}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-5 mb-6">
                    <div className="text-center">
                      <p className="text-[12px] text-muted-foreground mb-1">3 Jahre</p>
                      <p className="text-[15px] font-bold">{fmt(animResult3y)}</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-[12px] text-muted-foreground mb-1">Förderquote</p>
                      <p className="text-[15px] font-bold">{mitarbeiter < 250 ? "35 %" : "25 %"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] text-muted-foreground mb-1">Branche</p>
                      <p className="text-[15px] font-bold">{branche}</p>
                    </div>
                  </div>

                  <a href="#kontakt" className="btn-cta w-full text-center block !text-[15px]">
                    Kostenlose Ersteinschätzung anfragen
                  </a>
                  <p className="text-center text-[12px] text-muted-foreground mt-3">
                    Persönliches Gespräch innerhalb von 24 Stunden
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-[11px] text-white/20 mt-6 max-w-md mx-auto">
            Unverbindliche Erstschätzung. Keine Steuerberatung. Das tatsächliche Förderpotenzial hängt von der individuellen Prüfung ab.
          </p>
        </div>
      </div>
    </section>
  );
}
