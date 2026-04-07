export default function SocialProof() {
  const stats = [
    { value: "500+", label: "geprüfte Projekte" },
    { value: "Ø €95.000", label: "Förderpotenzial" },
    { value: "98%", label: "Bewilligungsquote" },
  ];

  return (
    <section className="section-alt py-8">
      <div className="container-main flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[15px] font-semibold text-primary">{s.value}</span>
            <span className="text-[15px] text-muted-foreground">{s.label}</span>
            {i < stats.length - 1 && (
              <span className="hidden md:inline text-muted-foreground ml-4">·</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
