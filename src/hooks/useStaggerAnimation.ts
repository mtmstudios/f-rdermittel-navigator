import { useEffect, useRef } from "react";

/**
 * Adds .visible to a container when it enters the viewport,
 * triggering staggered child animations via CSS .stagger-children.
 */
export function useStaggerAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    // Fallback
    const timeout = setTimeout(() => el.classList.add("visible"), 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return ref;
}
