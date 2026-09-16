'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export default function TransitionLink(props: ComponentProps<typeof Link>) {
  const router = useRouter();
  const { href, onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition) return;

    e.preventDefault();
    doc.startViewTransition(() => {
      router.push(href.toString());
    });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
