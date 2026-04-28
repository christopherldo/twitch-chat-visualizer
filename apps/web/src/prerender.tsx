import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { LandingPage } from './pages/Landing/LandingPage';
import { landingMetadata } from './pages/Landing/data';
import { getLandingHeadElements } from './pages/Landing/seo';

export async function prerender() {
  const html = renderToString(
    <HelmetProvider>
      <LandingPage disableHelmet />
    </HelmetProvider>
  );

  return {
    html,
    head: {
      lang: 'pt-BR',
      title: landingMetadata.title,
      elements: new Set(getLandingHeadElements()),
    },
  };
}
