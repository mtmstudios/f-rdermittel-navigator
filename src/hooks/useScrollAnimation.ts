import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mark element for animation
    const fadeEls = el.querySelectorAll(".fade-in-up");
    fadeEls.forEach((child) => child.setAttribute("data-animate", "true"));

    // Also handle case where fade-in-up is on the ref itself
    if (el.classList.contains("fade-in-up")) {
      el.setAttribute("data-animate", "true");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add visible to all fade-in-up children
          fadeEls.forEach((child) => child.classList.add("visible"));
          if (el.classList.contains("fade-in-up")) {
            el.classList.add("visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    // Fallback: if observer doesn't fire within 2s, show content anyway
    const timeout = setTimeout(() => {
      fadeEls.forEach((child) => child.classList.add("visible"));
      if (el.classList.contains("fade-in-up")) {
        el.classList.add("visible");
      }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return ref;
}
