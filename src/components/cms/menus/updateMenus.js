import { menuActions } from 'actions'

const updateMenus = async ({ site }, dispatch) => {
  const siteID = site.id

  const upsertMenuItems = async (menuID, items) => {
    await menuActions.addMenuItems({ siteID, menuID, items }, dispatch)
  }

  await Promise.all(
    site.menus.items.map(async ({ id, slug, menuItems: { items } }) => {
      let menuID = id

      if (!menuID) {
        const result = await menuActions.addMenu({ siteID, slug }, dispatch)

        if (result?.data?.createMenu) {
          menuID = result.data.createMenu.id
        }
      }

      upsertMenuItems(menuID, items)
    })
  )
}

export default updateMenus
