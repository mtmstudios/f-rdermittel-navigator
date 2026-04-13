import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUtmParams } from "@/hooks/useUtmParams";
import { ArrowRight, TrendingUp, Building2, Users, Coins, Lock } from "lucide-react";

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
  const navigate = useNavigate();
  const utm = useUtmParams();

  const [mitarbeiter, setMitarbeiter] = useState(50);
  const [kostenPersonal, setKostenPersonal] = useState(400000);
  const [kostenExtern, setKostenExtern] = useState(0);
  const [hasFired, setHasFired] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", telefon: "" });
  const formRef = useRef<HTMLDivElement>(null);

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

  /* scroll form into view when it opens */
  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name: form.name,
      email: form.email,
      telefon: form.telefon,
      mitarbeiter: String(mitarbeiter),
      kostenPersonal: String(kostenPersonal),
      kostenExtern: String(kostenExtern),
      foerderpotenzial: String(perYear),
      ...utm,
    };
    try {
      const res = await fetch("https://mtmstudios.app.n8n.cloud/webhook/factonet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Webhook error");
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Forschungszulage Ersteinschätzung",
          content_category: "calculator_form",
        });
      }
      navigate("/danke");
    } catch {
      navigate("/danke");
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#307abe]/30 focus:border-[#307abe]/50 transition-all duration-200";

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

            {/* ─── Result Card: FIRST on mobile, RIGHT on desktop ─── */}
            <div className="order-1 md:order-2 md:sticky md:top-24">
              {/* Compact mobile bar */}
              <div className="md:hidden sticky top-[72px] z-20">
                <div
                  className="rounded-2xl overflow-hidden shadow-lg mx-[-4px]"
                  style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
                >
                  <div className="px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium mb-0.5">Ihr Förderpotenzial / Jahr</p>
                      <p className="text-[28px] font-extrabold text-white tracking-tight leading-none">{fmt(animPerYear)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 mb-0.5">3 Jahre</p>
                      <p className="text-[16px] font-bold text-white">{fmtShort(animTotal)}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{isKmu ? "35" : "25"} % Förderquote</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full result card — desktop only */}
              <div className="hidden md:block">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
                  />
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle, #307abe 0%, transparent 70%)" }}
                  />
                  <div className="relative p-6 sm:p-8">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-[#57a7dd]" />
                        <p className="text-[11px] sm:text-[12px] text-white/50 uppercase tracking-wider font-medium">Pro Jahr</p>
                      </div>
                      <p className="text-[36px] sm:text-[44px] font-extrabold text-white tracking-tight leading-none">{fmt(animPerYear)}</p>
                    </div>
                    <div className="h-px bg-white/10 mb-5" />
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-[11px] text-white/40 mb-1">3 Jahre gesamt</p>
                        <p className="text-[18px] sm:text-[20px] font-bold text-white">{fmtShort(animTotal)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-white/40 mb-1">Förderquote</p>
                        <p className="text-[18px] sm:text-[20px] font-bold text-white">{isKmu ? "35" : "25"} %</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.06] rounded-xl px-4 py-3 mb-6 border border-white/[0.06]">
                      <p className="text-[12px] text-white/60 leading-relaxed">
                        <span className="text-[#57a7dd] font-semibold">Rückwirkend</span> bis 2020 beantragbar —
                        bis zu <span className="text-white font-semibold">{fmtShort(perYear * 5)}</span> insgesamt möglich.
                      </p>
                    </div>

                    {/* CTA or Inline Form */}
                    {!showForm ? (
                      <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#307abe]/20 cursor-pointer"
                      >
                        Erstgespräch vereinbaren
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3 animate-fade-in">
                        <input
                          required type="text" placeholder="Ihr Name" value={form.name}
                          onChange={e => update("name", e.target.value)}
                          className={inputClass} autoComplete="name" autoFocus
                        />
                        <input
                          required type="tel" inputMode="tel" placeholder="Telefonnummer" value={form.telefon}
                          onChange={e => update("telefon", e.target.value)}
                          className={inputClass} autoComplete="tel"
                        />
                        <input
                          required type="email" inputMode="email" placeholder="E-Mail-Adresse" value={form.email}
                          onChange={e => update("email", e.target.value)}
                          className={inputClass} autoComplete="email"
                        />
                        <button
                          type="submit" disabled={submitting}
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#307abe]/20 disabled:opacity-60 cursor-pointer"
                        >
                          {submitting ? "Wird gesendet..." : (
                            <>
                              Erstgespräch anfordern
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                        <p className="flex items-center gap-1.5 text-[11px] text-white/30 justify-center">
                          <Lock size={11} /> Kostenlos & unverbindlich
                        </p>
                      </form>
                    )}
                    {!showForm && (
                      <p className="text-center text-[11px] text-white/30 mt-3">Persönliches Gespräch innerhalb von 24h</p>
                    )}
                  </div>
                </div>
                <p className="text-center text-[10px] text-muted-foreground/60 mt-4 leading-relaxed px-2">
                  Unverbindliche Erstschätzung. Keine Steuerberatung.
                </p>
              </div>
            </div>

            {/* ─── Sliders: SECOND on mobile, LEFT on desktop ─── */}
            <div className="order-2 md:order-1 space-y-5">
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

            {/* ─── Mobile: Form below sliders ─── */}
            <div className="order-3 md:hidden" ref={formRef}>
              {!showForm ? (
                <>
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 shadow-lg cursor-pointer"
                  >
                    Erstgespräch vereinbaren
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground/50 mt-3">
                    Unverbindliche Erstschätzung · Gespräch innerhalb von 24h
                  </p>
                </>
              ) : (
                <div
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{ background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium mb-0.5">Ihr Förderpotenzial / Jahr</p>
                        <p className="text-[28px] font-extrabold text-white tracking-tight leading-none">{fmt(animPerYear)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/40 mb-0.5">3 Jahre</p>
                        <p className="text-[18px] font-bold text-white">{fmtShort(animTotal)}</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/10 mb-5" />
                    <p className="text-[14px] text-white/60 font-medium mb-4">
                      Lassen Sie sich Ihr Ergebnis von einem Wirtschaftsprüfer bestätigen:
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        required type="text" placeholder="Ihr Name" value={form.name}
                        onChange={e => update("name", e.target.value)}
                        className={inputClass} autoComplete="name"
                      />
                      <input
                        required type="tel" inputMode="tel" placeholder="Telefonnummer" value={form.telefon}
                        onChange={e => update("telefon", e.target.value)}
                        className={inputClass} autoComplete="tel"
                      />
                      <input
                        required type="email" inputMode="email" placeholder="E-Mail-Adresse" value={form.email}
                        onChange={e => update("email", e.target.value)}
                        className={inputClass} autoComplete="email"
                      />
                      <button
                        type="submit" disabled={submitting}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 disabled:opacity-60 cursor-pointer"
                      >
                        {submitting ? "Wird gesendet..." : (
                          <>
                            Erstgespräch anfordern
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                      <p className="flex items-center gap-1.5 text-[11px] text-white/30 justify-center">
                        <Lock size={11} /> Kostenlos & unverbindlich
                      </p>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
