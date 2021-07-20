# Templates

The template files must be stored in a specific spot so jamCMS knows about their existence and can import them on the fly. There will be customization options in the future to allow for a differnt file/folder structure.

## Post Types

Post types must be stored here, where `POST_TYPE_ID` is i.e. page, post or custom_post_type and `TEMPLATE_ID` is i.e. default, archive or other_page_template.

```
src/templates/postTypes/[POST_TYPE_ID]/[TEMPLATE_ID]/[TEMPLATE_ID].[js|jsx|tsx]
```

## Taxonomies

Taxonomy templates must be saved here where `TAXONOMY_ID` is i.e. category, post_tag or custom_taxonomy:

```
src/templates/taxonomies/[TAXONOMY_ID]/single/single.[js|jsx|tsx]
```

## Protected Pages

jamCMS supports private pages out of the box. You only have to add a template file to the following directory.

```
src/templates/protected/private.[js|jsx|tsx]
```

The template file itself needs to include the `<LoginForm />` provided by jamCMS.

```
import React from 'react';
import { LoginForm } from 'jam-cms';

const Private = (props) => <LoginForm url={process.env.GATSBY_JAM_CMS_URL} />

export default Private;
```

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/what-is-jam-cms.md)
- [Features](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/features.md)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/get-started.md)
- [Fields](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/fields.md)
- Templates
- [Field Types](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/field-types.md)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/gatsby-config.md)
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/wordpress-config.md)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/known-issues.md)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/changelog.md)
