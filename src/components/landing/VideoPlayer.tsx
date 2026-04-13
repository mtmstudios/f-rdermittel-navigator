import { useState } from "react";

interface VideoPlayerProps {
  /** YouTube or Vimeo embed URL, e.g. "https://www.youtube.com/embed/VIDEO_ID" */
  embedUrl?: string;
  /** Label shown below play button */
  label?: string;
  /** Duration text, e.g. "5:56 Min." */
  duration?: string;
  /** Aspect ratio class — default 16:9 */
  className?: string;
  /** Dark or light variant */
  variant?: "dark" | "light";
}

/**
 * Premium video player with custom play overlay.
 * Replace embedUrl with actual YouTube/Vimeo URL after upload.
 * Videos must be hosted externally (too large for static hosting).
 */
export default function VideoPlayer({
  embedUrl,
  label = "Video ansehen",
  duration,
  className = "",
  variant = "dark",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && embedUrl) {
    // Append autoplay param
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

  return (
    <button
      type="button"
      onClick={() => embedUrl && setPlaying(true)}
      aria-label={label}
      className={`relative w-full rounded-2xl overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe] ${className}`}
    >
      <div
        className="relative w-full"
        style={{ paddingBottom: "56.25%" }}
      >
        <div className={`absolute inset-0 flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-[#0a0a0e] to-[#14141e]"
            : "bg-gradient-to-br from-gray-50 to-gray-100 border border-border"
        }`}>
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
            color: isDark ? "white" : "black",
          }} />

          {/* Play button */}
          <div className="text-center relative z-10">
            <div className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 ${
              isDark
                ? "bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/15"
                : "bg-white border border-border shadow-sm group-hover:shadow-md"
            }`}>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ml-0.5 ${isDark ? "text-white" : "text-foreground"}`}
                fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"
              >
                <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
              </svg>
            </div>
            <p className={`text-[13px] sm:text-[14px] font-medium ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
              {label}
            </p>
            {duration && (
              <p className={`text-[11px] sm:text-[12px] mt-1 ${isDark ? "text-white/20" : "text-muted-foreground/60"}`}>
                {duration}
              </p>
            )}
          </div>

        </div>
      </div>
    </button>
  );
}
