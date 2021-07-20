# Get Started

## WordPress

Install the following plugins to your WordPress site.

### Required plugins

- [WP jamCMS](https://github.com/robinzimmer1989/jam-cms-wordpress)
- Advanced Custom Fields PRO (5.9.5)
- Custom Post Type UI (1.9.2)
- WP Gatsby (1.0.10)
- WPGraphQL (1.5.0)
- [WPGraphQL for Advanced Custom Fields (0.5.2)](https://github.com/wp-graphql/wp-graphql-acf/tags)
- [WPGraphQL JWT Authentication (0.4.1)](https://github.com/wp-graphql/wp-graphql-jwt-authentication/tags)
  Follow the plugin instructions and add a secret key to your wp-config.php file.
- Yoast SEO (16.6.1)
- WPGraphQL Yoast SEO Addon (4.14.2)

### Optional plugins

- Classic Editor (1.6)
- JAMstack Deployments (1.1.1)
- Post Types Order (1.9.5.6)
- Safe SVG (1.9.9)

* jamCMS has been tested with the given version numbers. That doesn't mean that newer or older plugin versions don't work, but if you run into any issues, try out the given version number and then open an [issue](https://github.com/robinzimmer1989/jam-cms/issues).

## Gatsby

If you want a kick-start, check out the [starter theme](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/gatsby-starter-theme), otherwise install the following plugins:

```
yarn add gatsby-source-jam-cms jam-cms
```

Add the source plugin to your `gatsby-config.js` file. Replace `YOUR_WP_URL` with the actual WordPress URL. Copy and paste the API key from the jamCMS settings page in WordPress `/wp-admin/options-general.php?page=jam-cms`.

```
{
  resolve: `gatsby-source-jam-cms`,
  options: {
    source: YOUR_WP_URL,
    apiKey: YOUR_API_KEY,
  },
},
```

Next, create a `fields.js` file in the `src` directory of the project with the following contents:

```
const fields = {
  postTypes: [],
  taxonomies: [],
  themeOptions: []
};

export default fields
```

That's it! You can now run `gatsby-develop`, navigate to `http:localhost:8000/jam-cms` and log in with your WordPress credentials.

To build out pages server-side, jamCMS relies on the `gatsby-source-wordpress` plugin. There are plenty of tutorials out there on how to set it up properly. Check out the [documentation](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress) for further reference.

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/what-is-jam-cms.md)
- [Features](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/features.md)
- Get Started
- [Fields](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/fields.md)
- [Templates](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/templates.md)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/field-types.md)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/gatsby-config.md)
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/wordpress-config.md)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/known-issues.md)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/changelog.md)
