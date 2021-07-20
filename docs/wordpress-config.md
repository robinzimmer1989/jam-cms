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

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/what-is-jam-cms.md)
- [Features](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/features.md)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/get-started.md)
- [Fields](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/fields.md)
- [Templates](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/templates.md)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/field-types.md)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/gatsby-config.md)
- WordPress configuration
- [Know issues](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/known-issues.md)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/changelog.md)
