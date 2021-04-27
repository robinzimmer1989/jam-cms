import React from 'react';
import Helmet from 'react-helmet';
import Parser from 'html-react-parser';

const Seo = (props) => {
  const { siteTitle, seo } = props;
  const { title, metaDesc, opengraphImage } = seo || {};

  return (
    <Helmet>
      <title>{Parser(title || '')}</title>
      <meta name="description" content={Parser(metaDesc || '')} />
      <meta property="og:description" content={Parser(metaDesc || '')} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={opengraphImage?.sourceUrl || ''} />
      <meta property="og:site_name" content={Parser(siteTitle || '')} />
      <meta property="og:title" content={Parser(title || '')} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:image" content={opengraphImage?.sourceUrl || ''} />
      <meta property="twitter:title" content={Parser(title || '')} />
    </Helmet>
  );
};

export default Seo;
