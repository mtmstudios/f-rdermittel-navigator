export default function SocialProof() {
  const stats = [
    { value: "500+", label: "geprüfte Projekte" },
    { value: "Ø 95.000 €", label: "Förderpotenzial" },
    { value: "98 %", label: "Bewilligungsquote" },
    { value: "3 Jahre", label: "rückwirkend möglich" },
  ];

  return (
    <section className="py-14 border-b border-border">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{s.value}</p>
              <p className="text-[13px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
