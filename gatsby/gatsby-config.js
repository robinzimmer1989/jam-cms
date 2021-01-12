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
    {
      resolve: `gatsby-source-jam-cms`,
      options: {
        source: process.env.GATSBY_CMS_SOURCE,
        apiKey: process.env.GATSBY_CMS_API_KEY,
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
          google: [
            { family: `Source Sans Pro`, variant: ['300', '400', '500', '700'] },
            { family: `Merriweather`, variant: ['400', '700'] },
          ],
        },
      },
    },
  ],
};
