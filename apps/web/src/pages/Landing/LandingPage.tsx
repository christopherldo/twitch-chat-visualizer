import { Helmet } from 'react-helmet-async';
import { CallToActionSection } from './CallToActionSection';
import { FAQSection } from './FAQSection';
import { FeaturesSection } from './FeaturesSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { UseCasesSection } from './UseCasesSection';
import {
  faqSchema,
  googleSiteVerification,
  landingMetadata,
  softwareApplicationSchema,
} from './data';

interface LandingPageProps {
  disableHelmet?: boolean;
}

export function LandingPage({ disableHelmet = false }: LandingPageProps) {
  const shouldRenderHelmet = !disableHelmet;

  return (
    <>
      {shouldRenderHelmet ? (
        <Helmet prioritizeSeoTags>
          <html lang="pt-BR" />
          <title>{landingMetadata.title}</title>
          <meta name="description" content={landingMetadata.description} />
          <meta name="keywords" content={landingMetadata.keywords} />
          <meta name="robots" content="index, follow, max-image-preview:large" />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="Twitch Chat Visualizer" />
          <meta property="og:title" content={landingMetadata.title} />
          <meta property="og:description" content={landingMetadata.description} />
          <meta property="og:url" content={landingMetadata.canonicalUrl} />
          <meta property="og:image" content={landingMetadata.ogImage} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={landingMetadata.title} />
          <meta name="twitter:description" content={landingMetadata.description} />
          <meta name="twitter:image" content={landingMetadata.ogImage} />

          <link rel="canonical" href={landingMetadata.canonicalUrl} />

          {googleSiteVerification ? (
            <meta name="google-site-verification" content={googleSiteVerification} />
          ) : null}

          <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
      ) : null}

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
          Pular para o conteudo
        </a>
        <HeroSection />
        <main id="conteudo">
          <FeaturesSection />
          <HowItWorksSection />
          <UseCasesSection />
          <FAQSection />
          <CallToActionSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}
