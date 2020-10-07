import { API, graphqlOperation } from 'aws-amplify'

import { createMenu, updateMenu as dbUpdateMenu } from '../graphql/mutations'

export const addMenu = async ({ siteID, slug, content }) => {
  const result = await API.graphql(
    graphqlOperation(createMenu, {
      input: { siteID, slug, content: JSON.stringify(content) },
    })
  )

  if (result?.data?.createMenu) {
    result.data.createMenu.content = JSON.parse(result.data.createMenu.content)
  }

  return result
}

export const updateMenu = async ({ id, content }) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdateMenu, {
      input: { id, content: JSON.stringify(content) },
    })
  )

  if (result?.data?.updateMenu) {
    result.data.updateMenu.content = JSON.parse(result.data.updateMenu.content)
  }

  return result
}
