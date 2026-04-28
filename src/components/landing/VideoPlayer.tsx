import { useState } from "react";

interface VideoPlayerProps {
  embedUrl?: string;
  label?: string;
  duration?: string;
  className?: string;
  variant?: "dark" | "light";
}

export default function VideoPlayer({
  embedUrl,
  label = "Video ansehen",
  duration,
  className = "",
  variant = "dark",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && embedUrl) {
    const url = embedUrl.includes("?")
      ? `${embedUrl}&autoplay=1`
      : `${embedUrl}?autoplay=1`;

    return (
      <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={url}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={label}
          />
        </div>
      </div>
    );
  }

  const isDark = variant === "dark";
  const ytMatch = embedUrl?.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const ytId = ytMatch?.[1];
  const thumb = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null;
  const thumbHi = ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : null;

  return (
    <button
      type="button"
      onClick={() => embedUrl && setPlaying(true)}
      aria-label={label}
      className={`relative w-full rounded-2xl overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe] ${className}`}
    >
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isDark
              ? "bg-gradient-to-br from-[#0a0a0e] to-[#14141e]"
              : "bg-gradient-to-br from-gray-50 to-gray-100 border border-border"
          }`}
        >
          {thumb && (
            <img
              src={thumb}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                if (thumbFallback && e.currentTarget.src !== thumbFallback) {
                  e.currentTarget.src = thumbFallback;
                }
              }}
            />
          )}
          {thumb && (
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          )}
          {!thumb && (
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "24px 24px",
                color: isDark ? "white" : "black",
              }}
            />
          )}

          {/* Play button */}
          <div className="text-center relative z-10">
            <div
              className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 ${
                isDark
                  ? "bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/15"
                  : "bg-white border border-border shadow-sm group-hover:shadow-md"
              }`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ml-0.5 ${isDark ? "text-white" : "text-foreground"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
              </svg>
            </div>
            <p
              className={`text-[13px] sm:text-[14px] font-medium ${isDark ? "text-white/90" : "text-muted-foreground"}`}
              style={{ textShadow: thumb ? "0 1px 4px rgba(0,0,0,0.6)" : undefined }}
            >
              {label}
            </p>
            {duration && (
              <p
                className={`text-[11px] sm:text-[12px] mt-1 ${isDark ? "text-white/70" : "text-muted-foreground/60"}`}
                style={{ textShadow: thumb ? "0 1px 4px rgba(0,0,0,0.6)" : undefined }}
              >
                {duration}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
