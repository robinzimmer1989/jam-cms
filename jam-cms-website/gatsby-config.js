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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-jam-cms`,
      options: {
        source: process.env.GATSBY_JAM_CMS_URL,
        apiKey: process.env.GATSBY_JAM_CMS_API_KEY,
        templates: path.join(__dirname, 'src/templates'), // optional
        globalOptions: path.join(__dirname, 'src/globalOptions'), // optional
        settings: {
          postsPerPage: 2,
        },
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `${process.env.GATSBY_JAM_CMS_URL}/graphql`,
        develop: {
          hardCacheMediaFiles: true,
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
          google: [
            { family: `Source Sans Pro`, variant: ['300', '400', '500', '700'] },
            { family: `Merriweather`, variant: ['400', '700'] },
          ],
        },
      },
    },
  ],
};
