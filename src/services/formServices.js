import { db } from '.'

export const addForm = async ({ siteID, title }) => {
  let result = await db('createForm', { siteID, title })
  return result
}

export const updateForm = async ({ siteID, id, title, content }) => {
  let result = await db('updateForm', {
    siteID,
    id,
    title,
    content: content ? JSON.stringify(content) : null,
  })

  return result
}

export const getForm = async ({ siteID, id }) => {
  let result = await db('getPost', { siteID, id })
  return result
}

export const deleteForm = async ({ siteID, id }) => {
  let result = await db('deleteForm', { siteID, id })
  return result
}
