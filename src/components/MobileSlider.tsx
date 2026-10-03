'use client';

import { Children, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react';

const mobileQuery = '(max-width: 767px)';
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const mobileSnapshot = () => window.matchMedia(mobileQuery).matches;
const serverSnapshot = () => false;

export default function MobileSlider({ children, label, desktopClassName }: { children: ReactNode; label: string; desktopClassName: string }) {
  const slides = Children.toArray(children);
  const mobile = useSyncExternalStore(subscribe, mobileSnapshot, serverSnapshot);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<number | null>(null);
  const trackId = useId();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    destinationRef.current = null;
    if (!mobile) track.scrollLeft = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(track.children) as HTMLElement[];
      let nearest = 0;
      let distance = Infinity;
      items.forEach((item, index) => {
        const delta = Math.abs(item.offsetLeft - items[0].offsetLeft - track.scrollLeft);
        if (delta < distance) { nearest = index; distance = delta; }
      });
      if (nearest === destinationRef.current && distance < 2) destinationRef.current = null;
      setActive(mobile ? nearest : 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    track.addEventListener('scroll', schedule, { passive: true });
    schedule();
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [mobile, slides.length]);

  const moveTo = (index: number, instant = false) => {
    const track = trackRef.current;
    if (!track || !mobile) return;
    const target = Math.max(0, Math.min(slides.length - 1, index));
    const first = track.children[0] as HTMLElement;
    const item = track.children[target] as HTMLElement;
    if (!item || !first) return;
    destinationRef.current = target;
    track.scrollTo({
      left: item.offsetLeft - first.offsetLeft,
      behavior: instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!mobile || event.target !== event.currentTarget) return;
    const current = destinationRef.current ?? active;
    const targets: Record<string, number> = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    moveTo(targets[event.key]);
  };

  return (
    <div className="mobile-slider" role="region" aria-label={label} aria-roledescription={mobile ? 'carousel' : undefined}>
      <div
        id={trackId}
        ref={trackRef}
        className={`mobile-slider-track ${desktopClassName}`}
        role="group"
        aria-label={`${label} items`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={() => { destinationRef.current = null; }}
        onWheel={() => { destinationRef.current = null; }}
        onFocusCapture={(event) => {
          if (event.target === event.currentTarget) return;
          const slide = (event.target as HTMLElement).closest('.mobile-slide');
          if (slide) moveTo(Array.from(event.currentTarget.children).indexOf(slide), true);
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="mobile-slide" role={mobile ? 'group' : undefined} aria-roledescription={mobile ? 'slide' : undefined} aria-label={mobile ? `${index + 1} of ${slides.length}` : undefined}>
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="slider-controls">
          {mobile && <>
          <div className="slider-position">
            <span className="slider-count" role="status" aria-live="polite" aria-atomic="true">
              <span aria-hidden="true">{String(active + 1).padStart(2, '0')} <span className="slider-count-total">/ {String(slides.length).padStart(2, '0')}</span></span>
              <span className="sr-only">{label}: item {active + 1} of {slides.length}</span>
            </span>
            <span className="slider-hint">Swipe to explore</span>
          </div>
          <div className="slider-buttons">
            <button type="button" aria-label={`Previous ${label.toLowerCase()} item`} aria-controls={trackId} disabled={active === 0} onClick={() => moveTo((destinationRef.current ?? active) - 1)}><span aria-hidden="true">←</span></button>
            <button type="button" aria-label={`Next ${label.toLowerCase()} item`} aria-controls={trackId} disabled={active === slides.length - 1} onClick={() => moveTo((destinationRef.current ?? active) + 1)}><span aria-hidden="true">→</span></button>
          </div>
          </>}
        </div>
      )}
    </div>
  );
}
