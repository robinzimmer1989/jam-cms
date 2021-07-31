import React from 'react';
import Helmet from 'react-helmet';
import Parser from 'html-react-parser';

const Seo = (props: any) => {
  if (!props?.pageContext?.seo) {
    return null;
  }

  const {
    pageContext: { seo, language, translations, siteTitle },
    location,
  } = props;

  return (
    <Helmet htmlAttributes={{ lang: language?.slug || '' }}>
      <title>
        {`${Parser(seo.title || '')}${seo.title && siteTitle && ' - '}${Parser(siteTitle || '')}`}
      </title>
      <meta name="description" content={Parser(seo.metaDesc || '')} />

      <meta name="robots" content={seo?.metaRobotsNoindex || 'index'} />

      <meta property="og:description" content={Parser(seo.metaDesc || '')} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.opengraphImage?.sourceUrl || ''} />
      <meta property="og:site_name" content={Parser(siteTitle || '')} />
      <meta property="og:title" content={Parser(seo.title || '')} />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:image" content={seo.opengraphImage?.sourceUrl || ''} />
      <meta property="twitter:title" content={Parser(seo.title || '')} />

      {language ? (
        <link
          rel="alternate"
          href={location.href}
          hrefLang={language.locale.replace('_', '-').toLowerCase()}
        />
      ) : (
        <link rel="alternate" href={location.href} hrefLang="x-default" />
      )}

      {translations &&
        translations.map((o: any, i: number) => (
          <link
            key={i}
            rel="alternate"
            href={o.uri}
            hrefLang={o.language?.locale?.replace('_', '-').toLowerCase()}
          />
        ))}
    </Helmet>
  );
};

export default Seo;
