import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    // Skip animation if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    function tick(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return value;
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    // Fallback
    const t = setTimeout(() => setVisible(true), 2500);
    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  const projekte = useCountUp(500, 2000, visible);
  const potential = useCountUp(95000, 2000, visible);
  const quote = useCountUp(98, 1500, visible);

  const stats = [
    { value: `${projekte}+`, label: "geprüfte Projekte" },
    { value: `${potential.toLocaleString("de-DE")} €`, label: "Ø Förderpotenzial" },
    { value: `${quote} %`, label: "Bewilligungsquote" },
    { value: "3 Jahre", label: "rückwirkend möglich" },
  ];

  return (
    <section className="py-14 border-b border-border" ref={ref}>
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className="motion-safe:transition-all motion-safe:duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{s.value}</p>
              <p className="text-[13px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
