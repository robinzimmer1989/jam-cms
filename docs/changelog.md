# Changelog

### 1.10.0

- Feat: Multilingual support with Polylang
- Feat: Automatic SEO support out of the box
- Fix: Reset category dropdown when user switches between post types
- Fix: Remove global antd css

### 1.9.3

- Feat: Add noindex checkbox to editor sidebar
- Feat: Add export for logout function
- Fix: Share previews

### 1.9.2

- Fix: Tweak auth logic to allow for faster access
- Fix: Get user roles from WordPress
- Fix: Fix private post wrapper

### 1.9.1

- Fix: jam-cms export error
- Fix: check for templates directory before trying to read it

### 1.9.0

- Convert to TypeScript
- Feat: Private posts support
- Feat: Send welcome email option when creating new user
- Feat: Make posts per page editable for archive pages
- Fix: The postTypeID doesn't need to be assigned on the template level anymore
- Fix: Jodit add wp image class (for Gatsby inline images)
- Fix: Jodit code editor on full screen
- Fix: RichText breaks when editor is adding inline css
- Fix: Duplicated image issue on upload and then load more
- Fix: Switching between two templates with different queries causes error
- Fix: Discard link doesn't link to correct path
- Fix: Redirect logic on login to prevent fetching user and site twice
- Fix: Error when assigning and deleting links multiple times
- Fix: Bottom bar positioning when adding multiple images in gallery field
- Cypress: Basic testing setup

### 1.8.5

- Fix: discard changes not working when link target is nested
- Fix: update site on settings page causes other field values to disappear temporarily
- Add siteTitle to page context

### 1.8.4

- Fix: Build jam-cms

### 1.8.3

- New implementation for navigate away logic when content has changed
- Fix: Jodit disable resizing of images in sidebar (caused bug)
- Fix: Jodit focus status on empty textfield
- Fix: Jodit link selector
- Fix: Scrolling issue (multiple scrollbars) in post tree selector
- Fix: Site update not removing siteHasChanged flag afterwards
- Fix: Hide parent selector when front page
- Fix: Richtext component strips out numbers (causes i.e. h1 tags to be h)
- Fix: Update missing plugins list
- Fix: Disallow no title for post (return "No Title" now)
- Fix: New post without content doesn't show up in action monitor
- Add disable sync function in WP for security reasons

### 1.8.2

- Add media search functionality
- Fix: Query media items by mime type instead of filtering client-side
- Fix: Notification when no front page is selected
- Fix: Combine refresh token and getSite fetches to prevent logout issue
- Fix: Jodit onChange trigger on load
- Fix: Remove select button on media page

### 1.8.1

- Jodit: Update to latest version
- Jodit: Add placeholder
- Jodit fix: Jodit update causes other fields to reset
- Jodit: Fix automatic br tag
- Jodit: Fix parsing issue when users add code block
- Fix infinite scrolling issue in modal for media library
- Redirect to login form on logout
- Add back to home page link to login form
- Fix pagination issue in development mode

### 1.8.0

- New wysiwyg editor (switch from Draftjs to Jodit)
- Fix WP previews
- Take over post functionality
- Remove undo functionality

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

## Documentation

- [What is jamCMS?](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/what-is-jam-cms.md)
- [Features](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/features.md)
- [Get Started](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/get-started.md)
- [Fields](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/fields.md)
- [Templates](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/templates.md)
- [Field Types](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/field-types.md)
- [Gatsby configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/gatsby-config.md)
- [WordPress configuration](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/wordpress-config.md)
- [Know issues](https://github.com/robinzimmer1989/jam-cms/blob/master/docs/known-issues.md)
- Changelog
