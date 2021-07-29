import { termServices } from '../services';

export const addTerm = async (args: any, dispatch: any, config: any) => {
  const result = await termServices.addTerm(args, dispatch, config);

  if (result) {
    dispatch({
      type: `ADD_TERM`,
      payload: { ...result, taxonomyID: args.taxonomyID, siteID: args.siteID },
    });
  }
  return result;
};

export const updateTerm = async (args: any, dispatch: any, config: any) => {
  const result = await termServices.updateTerm(args, dispatch, config);

  if (result) {
    dispatch({
      type: `UPDATE_TERM`,
      payload: { ...result, taxonomyID: args.taxonomyID, siteID: args.siteID },
    });
  }

  return result;
};

export const deleteTerm = async ({ siteID, taxonomyID, id }: any, dispatch: any, config: any) => {
  const result = await termServices.deleteTerm({ siteID, taxonomyID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_TERM`, payload: { id: result, taxonomyID, siteID } });
  }

  return result;
};
