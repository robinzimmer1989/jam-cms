import formatSlug from './formatSlug'

function getParentSlug(posts, parentID, slug = '') {
  let newSlug = slug

  if (parentID && posts[parentID]) {
    const parentSlug = posts[parentID].slug + newSlug
    newSlug = getParentSlug(posts, posts[parentID].parentID, parentSlug)
  }

  return newSlug
}

export default function generateSlug(postType, postID) {

  if (!postType?.posts?.[postID]) {
    return ''
  }

  const { slug: postTypeSlug, posts, posts: { [postID]: { slug: postSlug, parentID } } } = postType

  const parentSlug = getParentSlug(posts, parentID)

  const slug = formatSlug(`${postTypeSlug}${parentSlug}${postSlug}`)

  return slug
}