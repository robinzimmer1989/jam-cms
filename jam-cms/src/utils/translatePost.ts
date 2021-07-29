import { navigate } from '@reach/router';
import produce from 'immer';
import { set } from 'lodash';

// import app components
import { languageActions } from '../actions';
import generateSlug from './generateSlug';

export default async function translatePost(
  { sites, siteID, id, language }: any,
  dispatch: any,
  config: any
) {
  const result = await languageActions.translatePost({ siteID, id, language }, dispatch, config);

  if (result) {
    // We need to add update the translated posts, so they know about the new translation
    Object.keys(result.translations).map((k) => {
      const nextPost = produce(
        sites[siteID]?.postTypes?.[result?.postTypeID].posts[result.translations[k]],
        (draft: any) => {
          set(draft, `translations.${result?.language}`, result?.id);
          return draft;
        }
      );

      dispatch({ type: 'ADD_POST', payload: { ...nextPost, siteID } });
    });

    // Add post to post type so we can then generate the slug and the route the newly created post
    const nextSite = produce(sites[siteID], (draft: any) => {
      return set(draft, `postTypes.${result.postTypeID}.posts.${result.id}`, result);
    });

    const slug = generateSlug({
      site: nextSite,
      postTypeID: result.postTypeID,
      postID: result.id,
      leadingSlash: true,
    });

    navigate(slug);
  }

  return result;
}
