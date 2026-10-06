'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// `data-reveal` variants: headings rise out of a mask, photos open from the bottom edge.
const variants: Record<string, { keyframes: Keyframe[]; duration: number }> = {
  fade: { keyframes: [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }], duration: 480 },
  mask: { keyframes: [{ clipPath: 'inset(0 0 100% 0)', transform: 'translateY(32px)' }, { clipPath: 'inset(0 0 -10% 0)', transform: 'translateY(0)' }], duration: 650 },
  clip: { keyframes: [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], duration: 700 },
};

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
        const variant = variants[element.dataset.reveal || ''] || variants.fade;
        const animation = element.animate(variant.keyframes, {
          duration: variant.duration,
          delay: Number(element.dataset.revealDelay || 0),
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'backwards',
        });
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
