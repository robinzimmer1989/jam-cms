const React = require('react');

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  process.env.GATSBY_GOOGLE_ANALYTICS &&
    headComponents.push(
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GOOGLE_ANALYTICS}`}
      ></script>
    );

  process.env.GATSBY_GOOGLE_ANALYTICS &&
    headComponents.push(
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GATSBY_GOOGLE_ANALYTICS}');
      `,
        }}
      />
    );

  replaceHeadComponents(headComponents);
};
