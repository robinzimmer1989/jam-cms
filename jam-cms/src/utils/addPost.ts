import { navigate } from '@reach/router';
import { set } from 'lodash';
import produce from 'immer';

// import app components
import { postActions } from '../actions';
import generateSlug from './generateSlug';

export default async function addPost(
  { site, postTypeID, title, parentID }: any,
  dispatch: any,
  config: any
) {
  const result = await postActions.addPost(
    { siteID: site.id, postTypeID, status: 'draft', title, parentID },
    dispatch,
    config
  );

  if (result?.id) {
    const postType = site?.postTypes?.[postTypeID];

    // Add post to post type so we can then generate the slug and the route the newly created post
    const nextPostType = produce(postType, (draft: any) => {
      return set(draft, `posts.${result.id}`, result);
    });

    const slug = generateSlug(nextPostType, result.id, site?.frontPage);

    navigate(`/${slug}`);
  }
}
