import { useEffect, useRef, useState } from "react";

// Reusable IntersectionObserver hook. Sets `inView` to true once and disconnects.
export function useInView({ threshold = 0.3, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

// Scroll-spy hook: tracks which section id is currently in view.
export function useScrollSpy(ids, { rootMargin = "-30% 0px -60% 0px" } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!ids || ids.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin, threshold: 0 }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
