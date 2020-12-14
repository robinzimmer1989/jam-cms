import React from 'react';
import Helmet from 'react-helmet';
import Parser from 'html-react-parser';

const Seo = (props) => {
  const { siteTitle, href, seo } = props;
  const { title, description, opengraphTitle, opengraphDescription, opengraphImage } = seo || {};

  return (
    <Helmet>
      {title && <title>{Parser(title)}</title>}

      {description && <meta name="description" content={Parser(description)} />}

      <meta property="og:type" content="website" />

      {(!!opengraphDescription || !!description) && (
        <meta property="og:description" content={Parser(opengraphDescription || description)} />
      )}

      {opengraphImage && <meta property="og:image" content={opengraphImage.sourceUrl} />}

      {siteTitle && <meta property="og:site_name" content={Parser(siteTitle)} />}

      {href && <meta property="og:url" content={href} />}

      {(opengraphTitle || title) && (
        <meta property="og:title" content={Parser(opengraphTitle || title)} />
      )}

      <meta name="twitter:card" content="summary" />

      {opengraphImage && <meta property="twitter:image" content={opengraphImage.sourceUrl} />}

      {(opengraphTitle || title) && (
        <meta property="twitter:title" content={Parser(opengraphTitle || title)} />
      )}
    </Helmet>
  );
};

export default Seo;
