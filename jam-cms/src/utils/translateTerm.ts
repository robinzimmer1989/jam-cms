import produce from 'immer';
import { set } from 'lodash';

// import app components
import { languageActions } from '../actions';

export default async function translateTerm(
  { sites, siteID, id, language }: any,
  dispatch: any,
  config: any
) {
  const result = await languageActions.translateTerm({ siteID, id, language }, dispatch, config);

  if (result) {
    // We need to add update the translated terms, so they know about the new translation
    Object.keys(result.translations).map((k) => {
      const term = sites[siteID]?.taxonomies?.[result?.taxonomyID].terms[result.translations[k]];

      const nextTerm = produce(term, (draft: any) => {
        set(draft, `translations.${result?.language}`, result?.id);
        return draft;
      });
      dispatch({ type: 'UPDATE_TERM', payload: { ...nextTerm, siteID } });
    });
  }

  return result;
}
