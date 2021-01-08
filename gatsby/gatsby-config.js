const path = require(`path`);

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `jamCMS`,
    description: ``,
    author: `@robinzimmer1989`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/cms/*`] },
    },
    {
      resolve: `gatsby-source-jam-cms`,
      options: {
        source: process.env.GATSBY_CMS_SOURCE,
        apiKey: process.env.GATSBY_CMS_API_KEY,
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `${process.env.GATSBY_CMS_WP}/graphql`,
        verbose: true,
        schema: {
          queryDepth: 8,
          typePrefix: `Wp`,
        },
        develop: {
          nodeUpdateInterval: 9999999,
          hardCacheMediaFiles: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [{ family: `Source Sans Pro`, variant: ['300', '400', '500', '700'] }],
        },
      },
    },
  ],
};
