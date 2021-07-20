# Fields

In the last [section](https://github.com/robinzimmer1989/jam-cms/docs/get-started) we added the `fields.js` file to the `src` directory. Now, we gonna populate it with content.

## Post Types

To add any post type like i.e. Page or Post we need to add an object with `id`, `title` and `templates` to the `postTypes` array.

```
const fields = {
  postTypes: [
    {
      id: 'page',
      title: 'Page',
      templates: [],
    },
  ],
  (...)
```

The `templates` array itself takes in an object with `id`, `label` and `fields`. The default template should have the id `default`. Currently, only pages support multiple templates.

```
const fields = {
  postTypes: [
    {
      id: 'page',
      title: 'Page',
      templates: [
        {
          id: 'default',
          label: 'Default',
          fields: []
        },
        {
          id: 'contact',
          label: 'Contact',
          fields: []
        }
      ],
    },
  ],
  (...)
```

In the next step we gonna popuate the `fields` array for one of the templates. The array expects - similar to the template itself - an object with `id`, `label` and `type`. You can check out all possible field types [here](https://github.com/robinzimmer1989/jam-cms/docs/field-types).

```
const fields = {
  postTypes: [
    {
      id: 'page',
      title: 'Page',
      templates: [
        {
          id: 'default',
          label: 'Default',
          fields: [
            {
              id: 'foo',
              type: 'wysiwyg',
              label: 'Bar',
            }
          ]
        },
        {
          id: 'contact',
          label: 'Contact',
          fields: []
        }
      ],
    },
  ],
  (...)
```

## Custom Post types

For custom post types, there is an option to easily rewrite the slug.

```
{
  id: 'product',
  title: 'Product',
  templates: [],
  options: {
    rewrite_slug: 'path-to-products',
  },
}
```

## Archive Templates

jamCMS will automatically create paginated archive pages if you use the id `archive` for a template. You can pass in a `postsPerPage` property here as well.

```
const fields = {
  postTypes: [
    {
      id: 'post',
      title: 'Post',
      templates: [
        {
          id: 'archive',
          label: 'Archive',
          postsPerPage: 10,
          fields: []
        },
      ],
    },
  ],
  (...)
```

The page template will then receive a `pagination` property within the `pageContext` in the following structure:

```
{
  basePath: 'path-of-the-archive-page'`,
  numberOfPosts: 40,
  postsPerPage: 5,
  numberOfPages: 8
  page: 1,
}
```

An example pagination component looks like this:

```
const renderPagination = () => {
  const items = [];

  if (numberOfPages < 2) {
    return null;
  }

  for (let i = 1; i <= numberOfPages; i++) {
    let pathname = basePath;

    if (i > 1) {
      pathname = `${basePath}page/${i}`;
    }

    items.push(
      <li key={i}>
        <Link to={pathname}>
          {i}
        </Link>
      </li>
    );
  }

  return items
}
```

In order to display posts on the archive page you have to query for them via Gatsby page query. Because on default jamCMS only has access to posts which already have been queried by Gatsby, we need to pass in a separate query to the `template` object. This will make sure that we always get the most up-to-date information.

For our post archive page for example we want to query for something like this. Important here is that `WPGraphQL` and `gatsby-source-wordpress` use a slightly different naming convention, so we need to translate it to match up with the regular page query `allWpProduct: allProduct`. Furthermore, it's important to know that we can't query images for the childImageSharp part since this piece is generated within Gatsby and WPGraphQL doesn't know about it. Instead we can query for the `sourceUrl` and the jamCMS image component will render the URL.

```
const fields = {
  postTypes: [
    {
      id: 'post',
      title: 'Post',
      templates: [
        {
          id: 'archive',
          label: 'Archive',
          postsPerPage: 10,
          fields: [],
          query: `{
          allWpProduct: allProduct {
            nodes {
              id
              title
              uri
              date
              featuredImage {
                node {
                  altText
                  srcSet
                  sourceUrl
                  mediaType
                  sizes
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }`,
        },
      ],
    },
  ],
  (...)
```

## Taxonomies

You can pass in an object with `id`, `title` and `postTypes` to the taxonomies array. If a template is provided, jamCMS will automatically create taxonomy pages.

```
const fields = {
  (...)
  taxonomies: [
    {
      id: 'category',
      title: 'Category',
      postTypes: ['post'],
    },
  ]
};
```

## Theme Options

For global fields like header and footer contents, we can add fields to the `themeOptions` array. Those follow the same pattern as the template fields.
The only difference is, that those fields get rendered in a separate "Theme" interface.

```
const fields = {
  (...)
  themeOptions: [
    {
      id: 'foo',
      type: 'wysiwyg',
      label: 'Bar'
    }
  ]
};
```

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/docs/what-is-jam-cms)
- [Features](https://github.com/robinzimmer1989/jam-cms/docs/features)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/docs/get-started)
- Fields
- [Templates](https://github.com/robinzimmer1989/jam-cms/docs/templates)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/docs/field-types)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/docs/gatsby-config)
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/docs/wordpress-config)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/docs/known-issues)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/docs/changelog)
