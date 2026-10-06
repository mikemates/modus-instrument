import { useLayoutEffect, useRef, useState } from 'react';

/** Sticky offset for a side panel that may be taller than the window. A panel that fits sticks `preferred` px below
    the top (clear of the top bar). A taller one gets a negative offset, so it scrolls with the page until its bottom
    is `gap` px above the window's edge, then stays there: its last line (the call to action) never goes out of reach,
    and nothing scrolls inside it. Recalculated when the panel or the window changes size. */
export function useFitSticky<T extends HTMLElement>(preferred = 96, gap = 24) {
  const ref = useRef<T>(null);
  const [top, setTop] = useState(preferred);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTop(Math.min(preferred, window.innerHeight - el.offsetHeight - gap));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [preferred, gap]);
  return { ref, top };
}
