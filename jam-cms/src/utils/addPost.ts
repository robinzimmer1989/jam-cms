import { navigate } from '@reach/router';
import { set } from 'lodash';
import produce from 'immer';

// import app components
import { postActions } from '../actions';
import generateSlug from './generateSlug';

export default async function addPost(
  { site, postTypeID, title, language }: any,
  dispatch: any,
  config: any
) {
  const result = await postActions.addPost(
    { siteID: site.id, postTypeID, status: 'draft', title, language },
    dispatch,
    config
  );

  if (result?.id) {
    // Add post to site so we can then generate the slug and the route the newly created post
    const nextSite = produce(site, (draft: any) => {
      return set(draft, `postTypes.${result.postTypeID}.posts.${result.id}`, result);
    });

    const slug = generateSlug({
      site: nextSite,
      postTypeID,
      postID: result.id,
      leadingSlash: true,
    });

    navigate(slug);
  }
}
