<img src="https://github.com/robinzimmer1989/jam-cms/blob/master/src/icons/jamCMS.svg" alt="jamCMS Logo" />

#### Alpha version

## Introduction

jamCMS is a layer on top of other CMS's like WordPress.
Technically it can connect to any CMS or data source, but it works best with WordPress at the moment.

It's optimized for Gatsby, but (theoretically) it could also be used with any other React framework.

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

## Get Started

### 1. Set up WordPress

Install the following plugins:

- Advanced Custom Fields PRO
- Custom Post Type UI
- JWT Auth by Useful Team (follow the plugin instructions)
- Yoast SEO
- JAMstack Deployments
- Classic Editor
- jamCMS (download from here: https://github.com/robinzimmer1989/jam-cms-wordpress)

### 2. Set up with Gatsby starter theme

Download jam-cms-gatsby-starter from here: https://github.com/robinzimmer1989/jam-cms-gatsby-starter

Run

```
yarn
```

or

```
npm i
```

Create .env.development in root directory with the following content (replace {{WordPress URL}} with the correct backend url)

```
GATSBY_CMS_SOURCE={{WordPress URL}}/wp-json/jamcms/v1
GATSBY_CMS_AUTH={{WordPress URL}}/wp-json/jwt-auth/v1/token
GATSBY_CMS_ROUTE=cms
GATSBY_CMS_API_KEY=
```

If you wanna change the backend route to something else, you also have to replace the path for gatsby-plugin-create-client-paths in gatsby-config.js and rename the page in /src/pages/cms.js.

The variable GATSBY_CMS_API_KEY is relevant for building the site. You can retrieve an API key once you're logged-in under Settings -> General.

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
      families: ['Nerko+One:400,400i,700', 'Roboto+Condensed:400,700'],
    },
  },
  css: css`
    body {
      background-color: #000000;
    }
  `
}
```

The "blocks" property is an object of all the content blocks. Each block has a fields object and the actual React component.

```
import Header, { fields as headerFields } from './Header'
import Footer, { fields as footerFields } from './Footer'
import Banner, { fields as bannerFields } from './Banner'

const blocks = {
  header: {
    component: Header,
    fields: headerFields,
  },
  footer: {
    component: Footer,
    fields: footerFields,
  },
  banner: {
    component: Banner,
    fields: bannerFields,
  },
}

export default blocks
```

The individual component looks something like this. We have a fields object, which defines the editor fields and passed in props, and the React component.
The "name" key in the fields object must be unique. The id of each field represents the prop which is passed into the react component. Right now, only lowercase strings without special characters are supported. A list of all field types can be found in the next section.

```
import React from 'react'
import Img from 'gatsby-image'

export const fields = {
  name: 'banner',
  label: 'Banner',
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Image'
    },
  ],
}

const Banner = ({ image }) => {
  return (
    <div style={{position: 'relative', height: '300px'}}>
      {image?.childImageSharp?.fluid && (
        <Img
          fluid={image.childImageSharp.fluid}
          objectFit="cover"
          objectPosition="50% 50%"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}

export default Banner
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

## Known issues

The project is still in an early alpha version with many changes to come. Here are some current issues:

- Limited ACF field support
- WYSIWYG editor needs improvement
- Premature Development screen
- Design tweaks
- (...)

## Roadmap

- Dashboard (Analytics integration)
- Add more ACF fields
- Add link selector similiar to WordPress
- Revisions
- Forms
- Netlify API integration
- (...)
