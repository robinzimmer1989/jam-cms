# Field Types:

**Important:** All field ID's must be lowercase and can't have special characters.

## Checkbox:

```
{
  id: 'foo',
  type: 'checkbox',
  label: 'Bar',
  defaultValue: 'checkbox-1', // optional
  instructions: 'Some instructions...', // optional
  options: [
    {
      name: 'Checkbox 1',
      value: 'checkbox-1',
    },
    {
      name: 'Checkbox 2',
      value: 'checkbox-2',
    },
  ],
},
```

## Color Picker

```
{
  id: 'primary',
  type: 'color_picker',
  label: 'Primary Color',
  defaultValue: '#000000', // optional
  instructions: 'Some instructions...', // optional
}
```

## Date

```
{
  id: 'date',
  type: 'date_picker',
  label: 'Date',
  defaultValue: new Date(), // optional
  instructions: 'Some instructions...', // optional
}
```

## File

```
{
  id: 'file',
  type: 'file',
  label: 'File',
  instructions: 'Some instructions...', // optional
}
```

## Flexible Content

```
{
  id: 'foo',
  type: 'flexible_content',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
  items: [
    {
      id: 'layout1',
      label: 'Text',
      fields: [
        {
          id: 'text',
          type: 'wysiwyg',
          label: 'Text',
          instructions: 'Some instructions...', // optional
        },
      ],
    },
    {
      id: 'layout2',
      label: 'Text & Image',
      fields: [
        {
          id: 'text',
          type: 'wysiwyg',
          label: 'Text',
          instructions: 'Some instructions...', // optional
        },
        {
          id: 'image',
          type: 'image',
          label: 'Image',
          instructions: 'Some instructions...', // optional
        },
      ],
    },
  ],
}
```

## Gallery

```
{
  id: 'foo',
  label: 'Bar',
  type: 'gallery',
  instructions: 'Some instructions...', // optional
}
```

Google Map
You have add a Google Maps API key to the site settings and enable the JavaScript API and Geocoding API in your Google Cloud Console.

```
{
  id: 'foo',
  label: 'Bar',
  type: 'google_map',
  instructions: 'Some instructions...', // optional
}
```

## Group

Groups will render their fields inside an accordion. That makes them the perfect tool to organize data fields.

```
{
  id: 'foo',
  label: 'Bar',
  type: 'group',
  instructions: 'Some instructions...', // optional
  fields: [
    {
      id: 'foo',
      type: 'text',
      label: 'Bar',
      instructions: 'Some instructions...', // optional
    },
  ],
}
```

## Image

```
{
  id: 'foo',
  type: 'image',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
}
```

The jamCMS WordPress plugin will return the image in the `gatsby-plugin-image` format. To work locally and in build mode, you need to import GatsbyImage from jam-cms.

```
import { GatsbyImage } from 'jam-cms';
```

Then you can pass in the image like this:

```
{image && (
   <GatsbyImage
      image={image}
      alt={image.altText}
  />
)}
```

jamCMS supports SVG upload out of the box. But since no file is downloaded/transformed by the sharp plugin, we need to query for the sourceUrl as well.

```
image {
  altText
  sourceUrl
  localFile {
    childImageSharp {
      gatsbyImageData(width: 800, placeholder: BLURRED)
    }
  }
}
```

## Link

```
{
  id: 'foo',
  type: 'link',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
}
```

## Menu

The menu id must be unique throughout the entire site.

```
{
  id: 'foo',
  type: 'menu',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
  maxLevel: 1 // default: 3
}
```

You can assign a max depth level to the menu so users won't be able to nest menu items infinitely.

## Number

```
{
  id: 'foo',
  type: 'number',
  label: 'Bar',
  defaultValue: 3, // optional
  instructions: 'Some instructions...', // optional
  min: 1, // optional
  max: 4, // optional
  step: 1 // optional
}
```

## Radio

```
{
  id: 'radio',
  type: 'radio',
  label: 'Radio',
  defaultValue: 'radio-1',
  instructions: 'Some instructions...', // optional
  options: [
    {
      name: 'Radio 1',
      value: 'radio-1',
    },
    {
      name: 'Radio 2',
      value: 'radio-2',
    },
  ],
}
```

## Repeater

```
{
  id: 'foo',
  type: 'repeater',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
  items: [
    {
      id: 'image',
      type: 'image',
      label: 'Add Image',
      instructions: 'Some instructions...', // optional
    },
  ]
}
```

## Select

```
{
  id: 'foo',
  type: 'select',
  label: 'Bar',
  defaultValue: 'option1',
  instructions: 'Some instructions...', // optional
  options: [
    {
      name: 'Option 1',
      value: 'option1',
    },
    {
      name: 'Option 2',
      value: 'option2',
    },
  ],
}
```

## Text

```
{
  id: 'foo',
  type: 'text',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
  rows: 5 // default: 1
}
```

## WYSIWYG

```
{
  id: 'foo',
  type: 'wysiwyg',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
}
```

To avoid certain issues when dealing with WYSIWYG fields, it’s recommended to use the RichText component from jamCMS.

```
import { RichText } from 'jam-cms';
```

The component will convert all internal links to Gatsby links, make sure that external links are opened in a new tab and will fix certain issues when dealing with live editing.

```
<RichText>{text}</RichText>
```

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/docs/what-is-jam-cms)
- [Features](https://github.com/robinzimmer1989/jam-cms/docs/features)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/docs/get-started)
- [Fields](https://github.com/robinzimmer1989/jam-cms/docs/fields)
- [Templates](https://github.com/robinzimmer1989/jam-cms/docs/templates)
- Field Types
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/docs/gatsby-config)
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/docs/wordpress-config)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/docs/known-issues)
- [Changelog](https://github.com/robinzimmer1989/jam-cms/docs/changelog)
