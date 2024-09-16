import Head from 'next/head';

export function MetaHead({
  title = 'Simplyfy',
  description = 'Beginner friendly guide',
  siteName = 'ayan',
  ogTitle = 'ayan',
  ogDescription = 'Code simplyfy easy peasy guides for beginners',
  ogImage = '/navlogo.png',
  ogUrl = 'https://guide-note-app.vercel.app',
  ogType = 'website'
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
    </Head>
  );
}
