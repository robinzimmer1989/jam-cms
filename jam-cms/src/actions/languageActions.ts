import { languageServices } from '../services';

export const getLanguages = async ({}: any, dispatch: any, config: any) => {
  const result = await languageServices.getLanguages({}, dispatch, config);
  return result;
};

export const addLanguage = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.addLanguage(args, dispatch, config);

  if (result) {
    dispatch({ type: 'UPDATE_LANGUAGES', payload: { siteID: args.siteID, languages: result } });
  }

  return result;
};

export const updateLanguage = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.updateLanguage(args, dispatch, config);

  if (result) {
    dispatch({ type: 'UPDATE_LANGUAGES', payload: { siteID: args.siteID, languages: result } });
  }

  return result;
};

export const deleteLanguage = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.deleteLanguage(args, dispatch, config);

  if (result) {
    dispatch({ type: 'DELETE_LANGUAGE', payload: args });
  }

  return result;
};

export const updateSettings = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.updateSettings(args, dispatch, config);

  if (result) {
    const { siteID, ...rest } = args;

    dispatch({
      type: 'UPDATE_LANGUAGE_SETTINGS',
      payload: { siteID, settings: rest },
    });
  }

  return result;
};

export const translatePost = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.translatePost(args, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_POST', payload: { ...result, siteID: args.siteID } });
    dispatch({ type: 'ADD_EDITOR_POST', payload: { ...result, siteID: args.siteID } });
  }

  return result;
};

export const translateTerm = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.translateTerm(args, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_TERM', payload: { ...result, siteID: args.siteID } });
  }

  return result;
};

export const translateMass = async (args: any, dispatch: any, config: any) => {
  const result = await languageServices.translateMass(args, dispatch, config);

  if (result) {
    dispatch({ type: 'SET_LANGUAGE_IN_MASS', payload: args });
  }

  return result;
};
