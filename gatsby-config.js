const path = require('path')
const lessToJson = require('less-to-json')

module.exports = {
  siteMetadata: {
    title: `Gatsby CMS`,
    description: ``,
    author: `@robinzimmer1989`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: lessToJson('src/theme/ant.less'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout`),
      },
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        components: path.join(__dirname, `src/components`),
        icons: path.join(__dirname, `src/icons`),
        services: path.join(__dirname, `src/services`),
        store: path.join(__dirname, `src/store`),
        theme: path.join(__dirname, `src/theme`),
        actions: path.join(__dirname, `src/actions`),
        utils: path.join(__dirname, `src/utils`),
        routes: path.join(__dirname, `src/routes`),
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Nunito',
            variants: ['300', '400', '700'],
          },
        ],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    // `gatsby-plugin-offline`,
  ],
}
