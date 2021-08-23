# Gatsby configuration

On this page, you'll find all possible options you can pass into the `gatsby-source-jam-cms` plugin.
Check out the [Get Started](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/get-started.md) page to learn more about setting up the environmental variables.

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
        // Deactivate automatic syncing of post types, templates and fields to WordPress (default: true)
        sync: true,
        // Deactivate the jamCMS editing interface altogether (default: false)
        decouple: false,
      },
    },
  },
]
```

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/what-is-jam-cms.md)
- [Features](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/features.md)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/get-started.md)
- [Fields](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/fields.md)
- [Templates](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/templates.md)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/field-types.md)
- Gatsby configuration
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/wordpress-config.md)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/known-issues.md)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/changelog.md)
