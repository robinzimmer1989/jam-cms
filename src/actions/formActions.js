import { formServices } from 'services'

export const getForm = async ({ id }, dispatch) => {
  const result = await formServices.getForm({ id })

  if (result?.data?.getForm) {
    dispatch({
      type: `ADD_FORM`,
      payload: result?.data.getForm,
    })
  }

  return result
}

export const addForm = async ({ siteID, title }, dispatch) => {
  const result = await formServices.addForm({ siteID, title })

  if (result?.data?.createForm) {
    dispatch({
      type: `ADD_FORM`,
      payload: result?.data.createForm,
    })
  }

  return result
}

export const updateForm = async ({ siteID, id, title }, dispatch) => {
  const result = await formServices.updateForm({ siteID, id, title })

  if (result?.data?.updateForm) {
    dispatch({
      type: `ADD_FORM`,
      payload: result?.data.updateForm,
    })
  }

  return result
}

export const deleteForm = async ({ id }, dispatch) => {
  const result = await formServices.deleteForm({ id })

  if (result?.data?.deleteForm) {
    dispatch({
      type: `DELETE_FORM`,
      payload: result?.data.deleteForm,
    })
  }

  return result
}
