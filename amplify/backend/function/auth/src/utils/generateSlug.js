const get = require('lodash/get')

const getParentSlug = require('./getParentSlug')
const formatSlug = require('./formatSlug')

const generateSlug = (postType, postID) => {
  if (!get(postType, `posts.${postID}`)) {
    return ''
  }

  const {
    slug: postTypeSlug,
    posts,
    posts: {
      [postID]: { slug: postSlug, parentID },
    },
  } = postType

  const parentSlug = getParentSlug(posts, parentID)

  const slug = formatSlug(`${postTypeSlug}${parentSlug}${postSlug}`)

  return slug
}

module.exports = generateSlug
