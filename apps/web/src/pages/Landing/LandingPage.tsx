import { Helmet } from 'react-helmet-async';
import { Nav } from '../../components/Nav';
import { CallToActionSection } from './CallToActionSection';
import { FAQSection } from './FAQSection';
import { FeaturesSection } from './FeaturesSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { StudioSection } from './StudioSection';
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
          <meta name="author" content={landingMetadata.authorName} />

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
          <link rel="author" href={landingMetadata.authorUrl} />

          {googleSiteVerification ? (
            <meta name="google-site-verification" content={googleSiteVerification} />
          ) : null}

          <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
      ) : null}

      <div className="relative min-h-screen overflow-x-clip text-slate-100">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-twitch-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Pular para o conteudo
        </a>
        <div className="px-4 sm:px-6 lg:px-8">
          <Nav repoUrl={landingMetadata.repoUrl} />
        </div>
        <HeroSection />
        <main id="conteudo">
          <StudioSection />
          <FeaturesSection />
          <HowItWorksSection />
          <UseCasesSection />
          <FAQSection />
          <CallToActionSection repoUrl={landingMetadata.repoUrl} />
        </main>
        <FooterSection
          repoUrl={landingMetadata.repoUrl}
          authorUrl={landingMetadata.authorUrl}
          authorName={landingMetadata.authorName}
        />
      </div>
    </>
  );
}
