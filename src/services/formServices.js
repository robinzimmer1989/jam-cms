import { API, graphqlOperation } from 'aws-amplify'

import { createForm, updateForm as dbUpdateForm, deleteForm as dbDeleteForm } from '../graphql/mutations'

export const addForm = async ({ siteID, title }) => {
  const result = await API.graphql(
    graphqlOperation(createForm, {
      input: { siteID, title },
    })
  )

  return result
}

export const updateForm = async ({ id, title, content }) => {
  const jsonContent = content ? JSON.stringify(content) : null

  const result = await API.graphql(
    graphqlOperation(dbUpdateForm, {
      input: { id, title, content: jsonContent },
    })
  )

  if (result?.data?.updateForm) {
    const form = result.data.updateForm

    result.data.updateForm = {
      ...form,
      content: form.content ? JSON.parse(form.content) : [],
    }
  }

  return result
}

export const getForm = async ({ id }) => {
  const result = await API.graphql(
    graphqlOperation(
      `
      query GetForm($id: ID!) {
        getForm(id: $id) {
          id
          siteID
          title
          content
          settings
        }
      }
    `,
      { id }
    )
  )

  if (result?.data?.getForm) {
    const form = result.data.getForm

    result.data.getForm = {
      ...form,
      content: form.content ? JSON.parse(form.content) : [],
    }
  }

  return result
}

export const deleteForm = async ({ id }) => {
  const result = await API.graphql(
    graphqlOperation(dbDeleteForm, {
      input: { id },
    })
  )

  return result
}
