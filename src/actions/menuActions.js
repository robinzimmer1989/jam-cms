import { menuServices } from '../services'

export const addMenu = async ({ siteID, slug, content }, dispatch) => {
  const result = await menuServices.addMenu({ siteID, slug, content })

  if (result?.data?.createMenu) {
    dispatch({ type: `ADD_MENU`, payload: result.data.createMenu })
  }

  return result
}

export const updateMenu = async ({ id, content }, dispatch) => {
  const result = await menuServices.updateMenu({ id, content })

  if (result?.data?.updateMenu) {
    dispatch({ type: `ADD_MENU`, payload: result.data.updateMenu })
  }

  return result
}
