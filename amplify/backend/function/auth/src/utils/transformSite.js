const produce = require('immer').produce
const set = require('lodash/set')
const get = require('lodash/get')

const convertToPropsSchema = require('./convertToPropsSchema')
const generateSlug = require('./generateSlug')

const transformSite = site => {
  const bucketName = `https://my-aws-project7deb432f10d54bd29e13786dda5e7f97project-gatsbycms.s3.ca-central-1.amazonaws.com/public`

  const nextSite = produce(site, draft => {
    // Convert mediaItems to object structure
    if (get(draft, `mediaItems.items`)) {
      draft.mediaItems = draft.mediaItems.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {})
    }

    // Convert forms to object structure
    if (get(draft, `forms.items`)) {
      draft.forms = draft.forms.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {})
    }

    // Convert posts and then post types to object structure
    if (get(draft, `postTypes.items`)) {
      draft.postTypes.items.map((o, i) => {
        if (get(o, `posts.items`)) {
          return (draft.postTypes.items[i].posts = draft.postTypes.items[i].posts.items.reduce(
            (ac, a) => ({ ...ac, [a.id]: a }),
            {}
          ))
        }
      })

      draft.postTypes = draft.postTypes.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {})
    }

    const transformField = (draft, item) => {
      return {
        ...item,
        fields: item.fields.map(field => {
          const { value, type } = field

          // Add image information
          if (type === 'image') {
            field.value = {
              url: `${bucketName}/${value.storageKey}`,
              altText: draft.mediaItems[value.id].altText,
            }
          }

          // Add current slugs
          if (type === 'menu') {
            field.value = field.value.map(menuItem => {
              const { postID, title, postTypeID, url, target } = menuItem

              return {
                title,
                slug: generateSlug(draft.postTypes[postTypeID], postID),
                url,
                target,
              }
            })
          }

          if (type === 'form') {
          }

          if (type === 'posts') {
          }

          return field
        }),
      }
    }

    const pages = []

    Object.values(draft.postTypes).map(postType => {
      const { posts } = postType

      return Object.values(posts).map(post => {
        const { id, title, status, content, seoTitle, seoDescription } = post

        const parsedContent = content ? JSON.parse(content) : []

        const transformedContent = parsedContent.map(item => transformField(draft, item))

        if (status === 'publish') {
          return pages.push({
            title,
            slug: generateSlug(postType, id),
            content: convertToPropsSchema(transformedContent),
            seoTitle,
            seoDescription,
          })
        }
      })
    })

    set(draft, `pages`, pages)

    if (draft.settings) {
      const settings = JSON.parse(draft.settings)

      settings.header = transformField(draft, settings.header)
      settings.footer = transformField(draft, settings.footer)

      set(draft, `settings`, {
        ...settings,
        header: convertToPropsSchema([settings.header])[0].data,
        footer: convertToPropsSchema([settings.footer])[0].data,
      })
    }

    delete draft.id
    delete draft.forms
    delete draft.mediaItems
    delete draft.postTypes
    delete draft.apiKey

    return draft
  })

  return nextSite
}

module.exports = transformSite
