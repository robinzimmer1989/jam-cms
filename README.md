<img src="https://raw.githubusercontent.com/robinzimmer1989/jam-cms/adf550c8b95751b8924b11b6a2fc9bf0b1c34cd0/src/icons/jamCMS.svg" alt="jamCMS Logo" />

## Introduction

A CMS for the JAMStack world. Made for developers.

### What is jamCMS?

jamCMS is not a CMS but a layer on top of other other CMS’s like WordPress. In this regard it’s similiar to TinaCMS. However, the main goal of this library is to melt frontend and backend back together in the same way you and your clients are used to it from non-headless websites.

#### WordPress + Gatsby

Technically, jamCMS can connect to any data source as long as there is an API which returns the data in the correct format. To begin with I've developed a WordPress plugin for a seamless integration. On the frontend side of things, it can be used with any React framework (in theory) but I started out to develop certain components specifically for Gatsby (i.e. gatsby-plugin-image).

jamCMS is fully integrated with the new gatsby-source-wordpress plugin!

### Why jamCMS?

#### Client

There are a lot of reasons why you should use jamCMS. Here are the most important one’s from a client’s perspective.

- Easy to use: Your clients already know how to use it because of the WordPress familiar user interface.
- Live editing: See how content changes look in realtime. Don’t worry about preview functionality anymore.
- Better editing: The entire content – including, header, footer and menus – can be edited within the editor.
- Unbreakable: Clients can’t add plugins or unsupported features to the site and potentially breaking it.
- Lightning Speed: Content editing is fast and page changes don’t require a reload, thanks to the use of React.

#### Developers

- Optimized workflow: Define fields, templates and post types in the code and the plugin automatically syncs those with WordPress.
- Fast Development: Everything is already set up and the developer can focus on what’s really important, the frontend.
- No Risk: The plugin integrates seamlessly with a regular WordPress-Gatsby setup and can be decoupled at any time.
- WordPress Plugins: You can still use all the WP plugins you can use for a regular headless site (i.e. WP All Import)

## Get Started

### WordPress:

**Must use plugins:**

- Advanced Custom Fields PRO (5.9.5)
- Custom Post Type UI (1.9.1)
- WP Gatsby (1.0.10)
- WPGraphQL (1.3.8)
- WPGraphQL for Advanced Custom Fields (0.5.2)
- WPGraphQL JWT Authentication (0.4.1)
  Follow the plugin instructions and add a secret key to your wp-config.php file.
- Yoast SEO (16.2)
- WPGraphQL Yoast SEO Addon (4.14.0)
- jamCMS (https://github.com/robinzimmer1989/jam-cms-wordpress)

**Optional plugins:**

- Classic Editor (1.6)
- JAMstack Deployments (1.1.1)
- Post Types Order (1.9.5.6)
- Safe SVG (1.9.9)

Things to know:

- Pretty permalinks must be enabled ('Post name').
- Revisions aren't working out of the box (at least not for Local by Flywheel / WPEngine), you need to enable them via wp-config.php like this:

```
define( 'WP_POST_REVISIONS', true );
```

### Gatsby:

**Quick start using starter theme**
The easiest way to get started it using the TailwindCSS starter theme (more to come):
https://github.com/robinzimmer1989/jam-cms/tree/master/jam-cms-starter-tailwind

Then create a `.env.development` file in the root directory with the following variables.

```
GATSBY_JAM_CMS_URL=https://jam.local/starter-tailwind
GATSBY_JAM_CMS_API_KEY=test123
```

Replace the URL with your actual WordPress URL. You can retrieve the API key by going to the jamCMS settings page in WordPress: `/wp-admin/options-general.php?page=jam-cms`

If everything is set up you can run `yarn && gatsby develop`. When you navigate to '/jam-cms' you can login with your WordPress credentials.

## Guide

When using Gatsby, you need to install the following core plugins:

```
yarn add gatsby-source-jam-cms jam-cms
```

Afterward, you can add the source plugin to your gatsby-config.js file. Follow the instructions above for setting up the environmental variables and retreiving the API key from the WordPress settings.

```
{
  resolve: `gatsby-source-jam-cms`,
  options: {
    source: process.env.GATSBY_JAM_CMS_URL,
    apiKey: process.env.GATSBY_JAM_CMS_API_KEY,
    fields: path.join(__dirname, 'src/fields'), // default: 'src/fields'
    settings: {
      postsPerPage: 5, // default: 10
      sync: true, // default: true
    },
  },
},
```

The source plugin is expecting a fields settings object to define post types, templates, taxonomies and theme options. Those will automatically get synced to WordPress once you run `gatsby develop` or save a post in development (unless you turn off syncing via plugin option). The fields.js file in the root of the src folder looks something like this.

I like to keep component and field config together. That's why for example the 'header' fields setting is being imported from the components folder. That's not a requirement though, you could also have one huge object here.

```
// import templates
import pageDefault from './templates/postTypes/page/default/config';
import postDefault from './templates/postTypes/post/default/config';
import postArchive from './templates/postTypes/post/archive/config';

// import theme options
import header from './components/header/config';
import footer from './components/footer/config';

const fields = {
  postTypes: [
    {
      id: 'page',
      title: 'Page',
      templates: [pageDefault],
    },
    {
      id: 'post',
      title: 'Post',
      templates: [postDefault, postArchive],
    },
  ],
  taxonomies: [
    {
      id: 'category',
      title: 'Category',
      postTypes: ['post'],
    },
  ],
  themeOptions: [
    header,
    footer,
  ],
};

export default fields;
```

The template config file (i.e. postDefault) looks something like this whereas the fields array can be populated with any kind of field you need (see 'Field Types' section).

```
const config = {
  id: 'default',
  postTypeID: 'post',
  label: 'Post Default',
  fields: [],
};

export default config;
```

As of now, the template components must be stored in a specific spot and named in certain way so the frontend knows about their existence.

Post type templates must be saved here:

```
'src/templates/postTypes/[POST_TYPE_ID]/[TEMPLATE_ID]/[TEMPLATE_ID].[js|jsx|tsx]'
```

POST_TYPE_ID: page | post | custom_post_type
TEMPLATE_ID: default | archive | other_page_template

Taxonomy templates must be saved here:

```
'src/templates/taxonomies/[TAXONOMY_ID]/single/single.[js|jsx|tsx]'
```

TAXONOMY_ID: caegory | post_tag | custom_taxonomy

## Field Types:

**Important:** All field ID's must be lowercase and can't have special characters.

#### Checkbox:

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

#### Color Picker

```
{
  id: 'primary',
  type: 'color_picker',
  label: 'Primary Color',
  defaultValue: '#000000', // optional
  instructions: 'Some instructions...', // optional
}
```

#### Date

```
{
  id: 'date',
  type: 'date_picker',
  label: 'Date',
  defaultValue: new Date(), // optional
  instructions: 'Some instructions...', // optional
}
```

#### File

```
{
  id: 'file',
  type: 'file',
  label: 'File',
  instructions: 'Some instructions...', // optional
}
```

#### Flexible Content

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

#### Gallery

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

#### Group

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

#### Image

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

#### Link

```
{
  id: 'foo',
  type: 'link',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
}
```

#### Menu

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

#### Number

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

#### Radio

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

#### Repeater

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

#### Select

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

#### Text

```
{
  id: 'foo',
  type: 'text',
  label: 'Bar',
  instructions: 'Some instructions...', // optional
  rows: 5 // default: 1
}
```

#### WYSIWYG

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

The component will convert all internal links to Gatsby links and make sure that external links are opened in a new tab.

```
{text && <RichText>{text}</RichText>}
```

## Know issues:

**ID restrictions (lowercase only):**
Field ID's must be lowercase and can't have special characters. This is caused by the way ACF field group keys are stored in WordPress (as post_name).

**Editor Sidebar**
The editor sidebar is part of the actual page template (wrapper around it). That means that CSS media queries aren't accurate anymore. To solve this issue you can listen to the jamCMS prop, passed into each template file, and check if the sidebar is open or not and tweak your media queries accordingly. This is especially necessary when dealing with `position: fixed;` content elements.

**Global styles overwrites:**
We’re using Ant Design under the hood and it’s adding global CSS to the site. There is no way of preventing this behavior currently. There are some open issues for this though and hopefully this will be resolved soon.

You can overcome this issue by simply overwriting the CSS properties in case they screw something up. It’s important to note that the behavior is different in development and build mode (SSR), so make sure you pay attention to style changes in both environments.

**WYSIWYG editor doesn't support images:**
Because all the content editing happens in a relatively small sidebar, adding images is not supported. However, instead you can use flexible content for rich media textfields. This gives you better control about responsive behavior and leads to a better look and feel overall.

## Changelog

### 1.7.1

- Fix update/delete user

### 1.7.0

- Add sidebar options (position, style, open status) to settings page
- Add support for multiple editors with detection if someones is editing the post already
- Empty trash functionality
- Add max depth property to menu (maxLevel)
- Add field instructions support
- Move jamCMS prop into pageContext

### 1.6.0

- Tweak sidebar menu design
- Fix: Missing date value on load
- Fix: Parse menu titles
- Make deploy clickable (admin only)
- Fix image overflowing issue
- Transform help dropdown to notifications panel
- Add visit website button to header
- Fix: only update deployment image if image exists
- Show info that pressing esc will reopen sidebar
- Better error handling when plugin is disabled

### 1.5.0

- Add preview support (WordPress + Share preview)
- Add option to disable syncing

### 1.4.5

- Fix various menu issues
- Fix flexible content issue when removed component is rendered
- Fix unpublished changes
- Fix sidebar height
- SVG support

### 1.4.4

- Fix missing api key when syncing manually
- Fix missing taxonomies

### 1.4.3

- Fix theme fields not showing until restart
- Tweak menu post picker design
- Add sidebar width to jamCMS prop
- Fix file extentions issue for templates

### 1.4.2

- Fix template selector bug
- Improve editor sidebar performance
- New menu field design

### 1.4.1

- Check if revisions are enabled in the
- Make page title clickable in post list

### 1.4.0

- Simplify API (remove duplicated id field)
- Sync templates and taxonomies on `gatsby develop`

### 1.3.0

- Simplify API (templates and globalOptions to fields)
- Sync all ACF fields on `gatsby develop`
- UX improvements for sidebar

### 1.2.0

- Inline menu editor
- Revisions support
- jamCMS Starter TailwindCSS
- Performance optimization
- Disallow subscribers in backend

### 1.1.0

- Add theme options to sidebar so user can view changes live
- Add color picker field support
- Add “Unpublished changes” panel to dashboard
- Fix Gatsby image issue

### 1.0.2

- Fix Yoast SEO integration

### 1.0.1

- Remove source maps from build

### 1.0.0

- Full integration with gatsby-source-wordpress plugin
- Taxonomy and archive support

### 0.6.0

- Fix logo

### 0.5.0

- add WPGraphQL query support
- switch to WPGraphQL auth plugin
- move jamCMS into gatsby plugin for an easier setup
- password forget and reset logic
- token expiration and refresh token logic
- re-order posts by drag-n-drop
- add Google map field support (basic)
- add gallery field suport
- enter press listener for forms
- add frontend url field to settings
- add next and prev arrows to media gallery
- style tweaks

### 0.4.1

- fix pre formatting
- fix update post function ignore post status
- add default overrides to starter

### 0.4.0

- brand new editor navigation
- category support
- remove theme property from jamCMS component for a simpler setup
- collection page improvements:
- Remove trashed posts from “All” category
- Posts count
- Search bar
- duplicate post
- simple profile page
- dozens of style tweaks

### 0.3.6

- fix redirect on slug change
- add version to footer
- remove react and react-dom dependencies to avoid mismatch
- tweak menu builder style

### 0.3.5

- fix dependency issues

### 0.3.4

- fix font issue in editor
- Margin fix for pre element in WYSIWYG editor
- fix slug check when loading page in editor

### 0.3.3

- fix collection not updating when saving post
- fix image modal close behaviour. Now it won’t close the media library module anymore.
- fix format slug function and always return trailing slash at the end
- fix trailing slash for front page
- return url from posts in menu builder and disable input field instead
- rename settings to globalOptions
- show disabled update button on post load

### 0.3.2

- fix compress npm build

### 0.3.1

- Fix bug where store didn’t update on media item deletion

### 0.3.0

- Replace flexible content and repeater section with drag and drop feature
- Update all packages to the latest version
- Fix editor style when no template is found
- Fix post save success message when fetch fails
- Remove placeholders for text and wysiwyg components
- Remove trashed posts and disable drafted posts in menu builder
- Change save/publish/update logic for better UX
- Fix spacing issues in WYSIWYG editor

### 0.2.11

- Fix import bug

### 0.2.10

- Add help icon to editor.
- Disable editor links on content change to avoid accidently navigating away and loss of content. Add notification about it to help icon.
- Add help icon to main backend with further information about the JamStack.
- Add notification to help icon as soon as there are undeployed changes.
- Drastically speed up post save time
- Design tweaks
- Fix font size in wysiwyg editor

### 0.2.9

- Fix issue where page reloaded when changing a site option (i.e. front page)

### 0.2.8

- Editor style tweaks (more contrast, wider sidebar)
- Automatically open accordion when adding repeater or flexible content item

### 0.0.1 – 0.2.7

- A lot!
