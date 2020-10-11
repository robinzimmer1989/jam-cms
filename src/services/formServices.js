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

export const updateForm = async ({ id, siteID, title }) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdateForm, {
      input: { id, siteID, title },
    })
  )

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
          fields
          settings
        }
      }
    `,
      { id }
    )
  )

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
