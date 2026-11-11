import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  url?: string;
  image?: string;
}

export default function SEO({ title, description, type = "website", url, image }: SEOProps) {
  const siteName = "Shavi Homes | Calgary Construction & Renovations";
  const fullTitle = title.includes("Shavi Homes") ? title : `${title} | Shavi Homes`;
  const canonicalUrl = url ? `https://shavihomes.com${url}` : "https://shavihomes.com";

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={`https://shavihomes.com${image}`} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={`https://shavihomes.com${image}`} />}
    </Helmet>
  );
}
