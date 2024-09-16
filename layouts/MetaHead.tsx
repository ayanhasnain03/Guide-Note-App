import siteData from 'siteData';
import Head from 'next/head';

export function MetaHead(props) {
  const { date, title, description, ogUrl } = props;

  // Debugging information
  console.log('MetaHead Props:', { date, title, description, ogUrl });
  console.log('Site Data:', siteData);

  const titleName = title || siteData.title;
  const metaDescription = description || siteData.headerDescription || titleName;
  const metaOgImage = siteData.ogBanner; // Ensure this path is correct

  return (
    <Head>
      <title>{titleName}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteData.author} />
      <meta property="og:title" content={titleName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:url" content={ogUrl || siteData.websiteUrl || ''} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleName} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      <meta name="twitter:url" content={ogUrl || siteData.websiteUrl || ''} />

      {/* Article Date */}
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  );
}
