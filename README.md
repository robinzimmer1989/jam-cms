<img src="https://raw.githubusercontent.com/robinzimmer1989/jam-cms/adf550c8b95751b8924b11b6a2fc9bf0b1c34cd0/src/icons/jamCMS.svg" alt="jamCMS Logo" />

### Alpha version

## Introduction

jamCMS is a layer on top of other CMS's like WordPress.
Technically it can connect to any CMS or data source, but it works best with WordPress at the moment.

It's optimized for Gatsby, but (theoretically) it can also be used with any other React framework.

<img src="https://raw.githubusercontent.com/robinzimmer1989/jam-cms/master/screenshot-1.png" alt="Pages" />

<img src="https://raw.githubusercontent.com/robinzimmer1989/jam-cms/master/screenshot-2.png" alt="Pages" />

## Reasons to use jamCMS

**For clients:**

- WordPress familiar user interface
- Major improvements like header, footer or menu editing
- Speed of a React application
- Previews are built-in because front- and backend components are the same
- Fast build times
- Clients can't break a site by adding unsupported features (i.e. plugin)

**For developers:**

- Optimized development workflow
- Build an entire website in just a couple of hours
- ACF fields are created automatically
- Post Types are generated with one click
- No risk. The CMS can be decoupled at any time
- You can still use all backend plugins as usual (i.e. WP All Import)

## Get Started

### 1. WordPress

Install the following plugins:

- Advanced Custom Fields PRO
- Custom Post Type UI
- JWT Auth by Useful Team (follow the plugin instructions and enable pretty permalinks)
- Yoast SEO
- JAMstack Deployments
- Classic Editor
- jamCMS (download from here: https://github.com/robinzimmer1989/jam-cms-wordpress)

### 2. React

##### Installation

```
// with yarn
yarn add jam-cms

// with npm
npm i jam-cms
```

##### Usage

Check out the 'How to contribute' and 'Development' section for more info.

```
import React from 'react';
import JamCms from 'jam-cms'

function App() {
  return (
    <JamCms blocks={blocks} theme={theme} />
  );
}
```

## How to contribute

Download / Fork https://github.com/robinzimmer1989/jam-cms

Run

```
yarn
```

Create .env.development in 'gatsby' subdirectory with the following content (replace {{WordPress URL}} with the correct backend url). The variable GATSBY_CMS_API_KEY is relevant for building the site. You can retrieve an API key once you're logged-in under Settings -> General.

```
GATSBY_CMS_SOURCE={{WordPress URL}}/wp-json/jamcms/v1
GATSBY_CMS_AUTH={{WordPress URL}}/wp-json/jwt-auth/v1/token
GATSBY_CMS_API_KEY=
```

Optional variables:

```
GATSBY_CMS_LOCAL_STORAGE_KEY=jam-cms-user
GATSBY_CMS_ROUTE=cms
```

If you wanna change the backend route from 'cms' to something else, you also have to replace the path for gatsby-plugin-create-client-paths in gatsby-config.js and rename the page in /src/pages/cms.js.

Run

```
gatsby develop
```

Visit https:localhost:8000/cms and login with your WordPress credentials.

## Development

The component takes in the props "blocks" and "theme".

```
<JamCms blocks={blocks} theme={theme} />
```

The theme prop is an object with "fonts" and "css" keys.

We're using webfontloader behind the scenes so you have to pass in fonts in the correct format (see: https://github.com/typekit/webfontloader). Those fonts are only loaded within the CMS, so you have to load them separately for the frontend (i.e. with gatsby-plugin-webfonts).

The second prop "css" represents global css. This also includes any kind of CSS reset.

```
import { css } from 'styled-components'

export default {
  fonts: {
    google: {
      families: ['Open+Sans:400,500,700'],
    },
  },
  css: css`
    body {
      background-color: #000000;
    }
  `
}
```

The "blocks" property is an object of all content blocks.

```
import header from './Header';
import footer from './Footer';
import banner from './Banner';

export default { header, footer, banner };
```

The individual component looks something like this.

At the bottom we have a default export with id, label, component and fields.
Important: The id of the block must be a lowercase string.

The id for each field represents the prop which gets passed into the React component (i.e. headline and image).
A list of all field types can be found in the next section.

```
import React from 'react';
import Img from 'gatsby-image';

const Banner = (props) => {
  const { image, headline } = props;

  return (
    <>
      <div>
        {image?.childImageSharp?.fluid && (
          <Img
            fluid={image.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={image.alt}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      <h1 children={headline} />
    </>
  );
};

export default {
  id: 'banner',
  label: 'Banner',
  component: Banner,
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Image',
    },
    {
      id: 'headline',
      type: 'text',
      label: 'Headline',
    },
  ],
};

```

## Supported field types

The following field types are supported. More to come.

#### Text

```
{
  id: 'foo',
  type: 'text',
  label: 'Bar',
}
```

#### WYSIWYG

```
{
  id: 'foo',
  type: 'wysiwyg',
  label: 'Bar',
}
```

#### Image

```
{
  id: 'foo',
  type: 'image',
  label: 'Bar',
}
```

#### Select

```
{
  id: 'foo',
  type: 'select',
  label: 'Bar',
  defaultValue: 'option1',
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

#### Number

```
{
  id: 'foo',
  type: 'number',
  label: 'Bar',
  defaultValue: 3,
  min: 1,
  max: 4,
  step: 1,
}
```

#### Repeater

```
{
  id: 'foo',
  type: 'repeater',
  label: 'Bar',
  defaultValue: [],
  items: [
    {
      id: 'image',
      type: 'image',
      label: 'Add Image',
    },
  ]
}
```

#### Menu

The menu id must be unqiue throughout the entire site.

```
{
  id: 'foo',
  type: 'menu',
  label: 'Bar'
}
```

#### Link

```
{
  id: 'foo',
  type: 'link',
  label: 'Bar'
}
```

#### Collection

```
{
  id: 'foo',
  type: 'collection',
  label: 'Bar'
}
```

#### Flexible Content

```
{
  id: 'foo',
  type: 'flexible_content',
  label: 'Bar',
  items: [
    {
      id: 'layout1',
      label: 'Text',
      fields: [
        {
          id: 'text',
          type: 'wysiwyg',
          label: 'Text',
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
        },
        {
          id: 'image',
          type: 'image',
          label: 'Image',
        },
      ],
    },
  ],
},
```

## Roadmap

- Tests (!!!)
- Dashboard (Analytics integration)
- Add more ACF fields
- Revisions
- Forms
- Netlify API integration
- Design tweaks
- (...)
