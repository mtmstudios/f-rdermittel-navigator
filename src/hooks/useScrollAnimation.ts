import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fadeEls = el.querySelectorAll(".fade-in-up");

    // Set up animation with stagger delays
    fadeEls.forEach((child, i) => {
      child.setAttribute("data-animate", "true");
      (child as HTMLElement).style.transitionDelay = `${i * 120}ms`;
    });

    if (el.classList.contains("fade-in-up")) {
      el.setAttribute("data-animate", "true");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fadeEls.forEach((child) => child.classList.add("visible"));
          if (el.classList.contains("fade-in-up")) {
            el.classList.add("visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);

    // Fallback
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
