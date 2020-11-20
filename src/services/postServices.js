import { db } from '.'

export const addPost = async ({ siteID, slug, postTypeID, title, parentID }) => {
  let result = await db('createPost', { siteID, title, slug, postTypeID, parentID })
  return result
}

export const getPost = async ({ siteID, postID }) => {
  let result = await db('getPost', { siteID, postID })
  return result
}

export const updatePost = async ({
  siteID,
  id,
  title,
  slug,
  status,
  content,
  seoTitle,
  seoDescription,
  parentID,
  featuredImage,
}) => {
  let result = await db('updatePost', {
    siteID,
    id,
    title,
    slug,
    status,
    content: JSON.stringify(content),
    seoTitle,
    seoDescription,
    parentID,
    featuredImage: JSON.stringify(featuredImage),
  })

  return result
}

export const deletePost = async ({ siteID, id }) => {
  let result = await db('deletePost', { siteID, id })
  return result
}
