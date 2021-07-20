# Gatsby configuration

On this page, you'll find all possible options you can pass into the `gatsby-source-jam-cms` plugin.
Check out the [Get Started](https://github.com/robinzimmer1989/jam-cms/docs/get-started) page to learn more about setting up the environmental variables.

```
const path = require(`path`);

plugins: [
  (...),
  {
    resolve: `gatsby-source-jam-cms`,
    options: {
      source: YOUR_WP_URL,
      apiKey: YOUR_API_KEY,
      // Change path to fields object
      fields: path.join(__dirname, 'src/fields'),
      settings: {
        // Deactivate automatic syncing of post types, templates and fields to WordPress
        sync: true,
      },
    },
  },
]
```

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/docs/what-is-jam-cms)
- [Features](https://github.com/robinzimmer1989/jam-cms/docs/features)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/docs/get-started)
- [Fields](https://github.com/robinzimmer1989/jam-cms/docs/fields)
- [Templates](https://github.com/robinzimmer1989/jam-cms/docs/templates)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/docs/field-types)
- Gatsby configuration
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/docs/wordpress-config)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/docs/known-issues)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/docs/changelog)
