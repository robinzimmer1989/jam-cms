# Know issues

There are certain know issues and currently, there is no way around this. Open an issue if you feel like this should be supported.

### ID restrictions (lowercase only)

All field ID's must be lowercase and can't have special characters. This is caused by the way ACF field group keys are stored in WordPress (as post_name).

```
{
  id: 'pleasedontuseanyspecicalcharactershere',
  type: 'wysiwyg',
  label: 'Example',
}
```

### Global styles overwrites

We’re using [Ant Design](https://ant.design/) under the hood and the library is adding global CSS to the site. There is no way to prevent this behavior currently. There are some open [issues](https://github.com/ant-design/ant-design/issues/9363) for this and hopefully this will be resolved soon.

You can overcome this issue by simply overwriting the CSS properties in case they screw something up. It’s important to note that the behavior is different in development and build mode (SSR), so make sure you pay attention to style changes in both environments.

### Gatsby Image only supports fluid

When using `<GatsbyImage />` you need to import it directly from `jam-cms`. This is important to make sure new images will work in the jamCMS backend on a live site.

```
import { GatsbyImage } from 'jam-cms';
```

Right now, only fluid images are supported, because jamCMS doesn't know about the image size since it's directly applied to the GraphQL query.
But if you want non-background images, simply change the behavior to `object-fit: contain`.

### Post name

Currently, only post name permalinks are supported. jamCMS will make sure the correct permalink structure is set on sync so you don't have to worry about anything here.

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/what-is-jam-cms.md)
- [Features](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/features.md)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/get-started.md)
- [Fields](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/fields.md)
- [Templates](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/templates.md)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/field-types.md)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/gatsby-config.md)
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/wordpress-config.md)
- Know issues
- [Changelog](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/changelog.md)
