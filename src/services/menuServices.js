import { API, graphqlOperation } from 'aws-amplify'

import { createMenu, createMenuItem, updateMenuItem as dbUpdateMenuItem } from '../graphql/mutations'

export const addMenu = async ({ siteID, slug }) => {
  const result = await API.graphql(
    graphqlOperation(createMenu, {
      input: { siteID, slug },
    })
  )

  return result
}

export const addMenuItem = async ({ siteID, menuID, position, postID }) => {
  const result = await API.graphql(
    graphqlOperation(createMenuItem, {
      input: { siteID, menuID, position, postID },
    })
  )

  return result
}

export const updateMenuItem = async ({ id, siteID, menuID, position, postID }) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdateMenuItem, {
      input: { id, siteID, menuID, position, postID },
    })
  )

  return result
}
