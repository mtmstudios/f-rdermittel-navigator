import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, TrendingUp, Building2, Users, Coins } from "lucide-react";

/* ── Meta Pixel: fire once when result first becomes visible ── */
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

/* ── Smooth count-up ── */
function useCountUp(target: number, duration = 800) {
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

function fmtShort(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(".", ",") + " Mio. €";
  if (v >= 1_000) return Math.round(v / 1_000) + "k €";
  return fmt(v);
}

export default function CalculatorSection() {
  const ref = useScrollAnimation();
  const [mitarbeiter, setMitarbeiter] = useState(50);
  const [kostenPersonal, setKostenPersonal] = useState(400000);
  const [kostenExtern, setKostenExtern] = useState(0);
  const [hasFired, setHasFired] = useState(false);

  const isKmu = mitarbeiter < 250;
  const rate = isKmu ? 0.35 : 0.25;
  const basis = Math.min(kostenPersonal + kostenExtern * 0.6, 4_000_000);
  const perYear = Math.min(Math.round((basis * rate) / 100) * 100, 1_000_000);
  const total3y = perYear * 3;

  const animPerYear = useCountUp(perYear);
  const animTotal = useCountUp(total3y);

  /* fire pixel once user has interacted */
  useEffect(() => {
    if (!hasFired && (mitarbeiter !== 50 || kostenPersonal !== 400000)) {
      setHasFired(true);
      fbqTrackOnce();
    }
  }, [mitarbeiter, kostenPersonal, hasFired]);

  return (
    <section id="rechner" className="relative py-20 md:py-28 overflow-hidden bg-[hsl(var(--background))]">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#307abe] mb-3">
              Förder-Rechner
            </p>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold tracking-[-0.02em] mb-3">
              Berechnen Sie Ihr Förderpotenzial
            </h2>
            <p className="text-[14px] sm:text-[16px] text-muted-foreground max-w-md mx-auto">
              Ziehen Sie die Regler — Ihr Ergebnis aktualisiert sich sofort.
            </p>
          </div>

          {/* Calculator Layout */}
          <div className="max-w-[960px] mx-auto grid md:grid-cols-[1fr,340px] gap-6 md:gap-8 items-start">
            {/* ─── Left: Sliders ─── */}
            <div className="space-y-5">
              {/* Mitarbeiter */}
              <div className="bg-white rounded-2xl border border-border/60 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-[#307abe]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] sm:text-[14px] font-semibold text-foreground">Mitarbeiter</p>
                  </div>
                  <span className="text-[22px] sm:text-[26px] font-bold text-foreground tabular-nums">
                    {mitarbeiter}
                  </span>
                </div>
                <input
                  type="range" min={1} max={500} value={mitarbeiter}
                  onChange={e => setMitarbeiter(Number(e.target.value))}
                  className="w-full accent-[#307abe]" aria-label="Mitarbeiterzahl"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[11px] text-muted-foreground">1</span>
                  <span className={`text-[11px] sm:text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                    isKmu
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {isKmu ? "KMU — 35 % Förderquote" : "Großunternehmen — 25 %"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">500+</span>
                </div>
              </div>

              {/* Personalkosten */}
              <div className="bg-white rounded-2xl border border-border/60 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0">
                    <Coins size={18} className="text-[#307abe]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] sm:text-[14px] font-semibold text-foreground">F&E Personalkosten / Jahr</p>
                  </div>
                  <span className="text-[17px] sm:text-[20px] font-bold text-foreground tabular-nums whitespace-nowrap">
                    {fmtShort(kostenPersonal)}
                  </span>
                </div>
                <input
                  type="range" min={50000} max={4000000} step={10000}
                  value={kostenPersonal}
                  onChange={e => setKostenPersonal(Number(e.target.value))}
                  className="w-full accent-[#307abe]" aria-label="Personalkosten F&E"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                  <span>50k €</span>
                  <span>4 Mio. €</span>
                </div>
              </div>

              {/* Externe */}
              <div className="bg-white rounded-2xl border border-border/60 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0">
                    <Building2 size={18} className="text-[#307abe]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] sm:text-[14px] font-semibold text-foreground">
                      Externe F&E <span className="text-muted-foreground font-normal">(optional)</span>
                    </p>
                  </div>
                  <span className="text-[17px] sm:text-[20px] font-bold text-foreground tabular-nums whitespace-nowrap">
                    {kostenExtern === 0 ? "—" : fmtShort(kostenExtern)}
                  </span>
                </div>
                <input
                  type="range" min={0} max={2000000} step={10000}
                  value={kostenExtern}
                  onChange={e => setKostenExtern(Number(e.target.value))}
                  className="w-full accent-[#307abe]" aria-label="Externe F&E-Aufträge"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                  <span>0 €</span>
                  <span>2 Mio. €</span>
                </div>
                {kostenExtern > 0 && (
                  <p className="text-[11px] text-muted-foreground mt-2.5 bg-blue-50/60 px-3 py-1.5 rounded-lg">
                    Externe Aufträge sind zu 60 % förderfähig.
                  </p>
                )}
              </div>
            </div>

            {/* ─── Right: Result Card (sticky on desktop) ─── */}
            <div className="md:sticky md:top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {/* Dark gradient background */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
                />
                {/* Subtle glow */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #307abe 0%, transparent 70%)" }}
                />

                <div className="relative p-6 sm:p-8">
                  {/* Per Year */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={14} className="text-[#57a7dd]" />
                      <p className="text-[11px] sm:text-[12px] text-white/50 uppercase tracking-wider font-medium">
                        Pro Jahr
                      </p>
                    </div>
                    <p className="text-[36px] sm:text-[44px] font-extrabold text-white tracking-tight leading-none">
                      {fmt(animPerYear)}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10 mb-5" />

                  {/* 3 Year + Rate */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-[11px] text-white/40 mb-1">3 Jahre gesamt</p>
                      <p className="text-[18px] sm:text-[20px] font-bold text-white">{fmtShort(animTotal)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 mb-1">Förderquote</p>
                      <p className="text-[18px] sm:text-[20px] font-bold text-white">
                        {isKmu ? "35" : "25"} %
                      </p>
                    </div>
                  </div>

                  {/* Rückwirkend Hint */}
                  <div className="bg-white/[0.06] rounded-xl px-4 py-3 mb-6 border border-white/[0.06]">
                    <p className="text-[12px] text-white/60 leading-relaxed">
                      <span className="text-[#57a7dd] font-semibold">Rückwirkend</span> bis 2020 beantragbar —
                      bis zu <span className="text-white font-semibold">{fmtShort(perYear * 5)}</span> insgesamt möglich.
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="#kontakt"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#307abe]/20"
                  >
                    Ersteinschätzung anfragen
                    <ArrowRight size={16} />
                  </a>
                  <p className="text-center text-[11px] text-white/30 mt-3">
                    Persönliches Gespräch innerhalb von 24h
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-center text-[10px] text-muted-foreground/60 mt-4 leading-relaxed px-2">
                Unverbindliche Erstschätzung. Keine Steuerberatung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
