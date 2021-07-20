# WordPress configuration

## jamCMS settings

You can change settings in the WordPress backend by visiting `/starter-tailwind/wp-admin/options-general.php?page=jam-cms`.

- Frontend URL: Important for sharing previews and the password reset functionality.
- Google Maps: Add your Google Maps API key for (reverse-) geocoding here. This is only required if you actually use the Google Maps field somewhere on the site.
- API Key: Required to sync post types, templates and ACF fields to the backend.
- Syncing: You can disable syncing altogether. This is especially recommended once you launch your website for security reasons.

## Revisions

Revisions aren't working out of the box (at least not for Local by Flywheel / WPEngine), you need to enable them via wp-config.php like this:

```
define( 'WP_POST_REVISIONS', true );
```

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/docs/what-is-jam-cms)
- [Features](https://github.com/robinzimmer1989/jam-cms/docs/features)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/docs/get-started)
- [Fields](https://github.com/robinzimmer1989/jam-cms/docs/fields)
- [Templates](https://github.com/robinzimmer1989/jam-cms/docs/templates)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/docs/field-types)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/docs/gatsby-config)
- WordPress configuration
- [Know issues](https://github.com/robinzimmer1989/jam-cms/docs/known-issues)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/docs/changelog)
