'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Enhance visible HTML; never leave content dependent on an observer to appear. */
export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new Set<Element>();
    const animations = new Map<Element, Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        if (preference.matches || entry.target.contains(document.activeElement)) continue;
        const element = entry.target as HTMLElement;
        const animation = element.animate(
          [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 480, delay: Number(element.dataset.revealDelay || 0), easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
        );
        animations.set(element, animation);
        animation.onfinish = () => animations.delete(element);
      }
    }, { threshold: 0.08 });

    const syncPreference = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (!preference.matches) {
        document.querySelectorAll('[data-reveal]').forEach((element) => {
          if (!seen.has(element)) observer.observe(element);
        });
      }
    };
    const onFocus = (event: FocusEvent) => {
      const element = (event.target as Element).closest('[data-reveal]');
      if (!element) return;
      seen.add(element);
      observer.unobserve(element);
      animations.get(element)?.cancel();
      animations.delete(element);
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    document.addEventListener('focusin', onFocus);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', syncPreference);
      document.removeEventListener('focusin', onFocus);
    };
  }, [pathname]);

  return null;
}
