import { menuServices } from '../services'

export const addMenu = async ({ siteID, slug }, dispatch) => {
  const result = await menuServices.addMenu({ siteID, slug })

  if (result?.data?.createMenu) {
    dispatch({ type: `ADD_MENU`, payload: result.data.createMenu })
  }

  return result
}

export const addMenuItems = async ({ items, siteID, menuID }, dispatch) => {
  const array = []

  await Promise.all(
    items.map(async ({ id, siteID, position, postID }) => {
      if (id) {
        const updateResult = await menuServices.updateMenuItem({ id, siteID, menuID, position, postID })

        if (updateResult?.data?.updateMenuItem) {
          array.push(updateResult.data.updateMenuItem)
        }
      } else {
        const createResult = await menuServices.addMenuItem({ siteID, menuID, position, postID })

        if (createResult?.data?.createMenuItem) {
          array.push(createResult.data.createMenuItem)
        }
      }
    })
  )

  // TODO: Add menu to editor site state AND all sites state
  // dispatch({ type: `ADD_MENU`, payload: { siteID, menuID, items } })

  return array
}
