# jamCMS - Alpha version

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

### 1. WordPress

Install the following the plugins:

- Advanced Custom Fields PRO
- Custom Post Type UI
- JWT Auth by Useful Team (follow the plugin instructions)
- Yoast SEO
- JAMstack Deployments
- Classic Editor
- jamCMS (download from here: https://github.com/robinzimmer1989/jam-cms-wordpress)

### 2. Gatsby

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

Visit https:localhost:8000/cms

## Known issues

The project is still in an early alpha version with many changes to come. Here are some current issues:

- Limited ACF field support
  (Text, WYSIWYG, Select, Repeater, Number, Menu, Link, Image, PostType)
- WYSIWYG editor needs improvement
- Premature Development screen
- (...)

## Roadmap

- Coming soon
