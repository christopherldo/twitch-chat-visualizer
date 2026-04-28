import {
  faqSchema,
  googleSiteVerification,
  landingMetadata,
  softwareApplicationSchema,
} from './data';

type HeadElement = {
  type: 'meta' | 'link' | 'script';
  props: Record<string, string>;
};

export function getLandingHeadElements(): HeadElement[] {
  const elements: HeadElement[] = [
    { type: 'meta', props: { name: 'description', content: landingMetadata.description } },
    { type: 'meta', props: { name: 'keywords', content: landingMetadata.keywords } },
    { type: 'meta', props: { name: 'robots', content: 'index, follow, max-image-preview:large' } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:locale', content: 'pt_BR' } },
    { type: 'meta', props: { property: 'og:site_name', content: 'Twitch Chat Visualizer' } },
    { type: 'meta', props: { property: 'og:title', content: landingMetadata.title } },
    { type: 'meta', props: { property: 'og:description', content: landingMetadata.description } },
    { type: 'meta', props: { property: 'og:url', content: landingMetadata.canonicalUrl } },
    { type: 'meta', props: { property: 'og:image', content: landingMetadata.ogImage } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: landingMetadata.title } },
    { type: 'meta', props: { name: 'twitter:description', content: landingMetadata.description } },
    { type: 'meta', props: { name: 'twitter:image', content: landingMetadata.ogImage } },
    { type: 'link', props: { rel: 'canonical', href: landingMetadata.canonicalUrl } },
    {
      type: 'script',
      props: {
        type: 'application/ld+json',
        textContent: JSON.stringify(softwareApplicationSchema),
      },
    },
    {
      type: 'script',
      props: {
        type: 'application/ld+json',
        textContent: JSON.stringify(faqSchema),
      },
    },
  ];

  if (googleSiteVerification) {
    elements.push({
      type: 'meta',
      props: {
        name: 'google-site-verification',
        content: googleSiteVerification,
      },
    });
  }

  return elements;
}
