import { formServices } from '../services';
import { siteActions } from '../actions';

export const getForm = async ({ site, id }, dispatch) => {
  // const result = await formServices.getForm({ id })
  // if (result?.data?.getForm) {
  //   dispatch({
  //     type: `ADD_FORM`,
  //     payload: result?.data.getForm,
  //   })
  //   dispatch({
  //     type: `ADD_EDITOR_FORM`,
  //     payload: result.data.getForm,
  //   })
  //   // Every time the user edits a post we need to restore the original site state
  //   siteActions.addSiteToEditor({ site }, dispatch)
  // }
  // return result
};

export const addForm = async ({ siteID, title }, dispatch) => {
  // const result = await formServices.addForm({ siteID, title })
  // if (result?.data?.createForm) {
  //   dispatch({
  //     type: `ADD_FORM`,
  //     payload: result?.data.createForm,
  //   })
  // }
  // return result
};

export const updateForm = async ({ id, title, content }, dispatch) => {
  // const result = await formServices.updateForm({ id, title, content })
  // if (result?.data?.updateForm) {
  //   dispatch({
  //     type: `ADD_FORM`,
  //     payload: result?.data.updateForm,
  //   })
  // }
  // return result
};

export const deleteForm = async ({ id }, dispatch) => {
  // const result = await formServices.deleteForm({ id })
  // if (result?.data?.deleteForm) {
  //   dispatch({
  //     type: `DELETE_FORM`,
  //     payload: result?.data.deleteForm,
  //   })
  // }
  // return result
};
