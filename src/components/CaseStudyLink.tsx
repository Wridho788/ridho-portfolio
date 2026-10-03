import type { ComponentProps } from 'react';

// A document navigation enables native cross-document shared-image transitions.
// Browsers without View Transitions retain an ordinary, fully functional link.
export default function CaseStudyLink(props: ComponentProps<'a'>) {
  return <a {...props} />;
}
