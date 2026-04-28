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
  className = "",
}: VideoPlayerProps) {
  if (!embedUrl) return null;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-black ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          title={label}
          loading="lazy"
        />
      </div>
    </div>
  );
}
