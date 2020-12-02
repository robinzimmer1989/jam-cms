import formatSlug from './formatSlug';
import getParentSlug from './getParentSlug';

export default function generateSlug(postType, postID, frontPage) {
  if (postID === frontPage) {
    return '/';
  }

  if (!postType?.posts?.[postID]) {
    return '';
  }

  const {
    slug: postTypeSlug,
    posts,
    posts: {
      [postID]: { slug: postSlug, parentID },
    },
  } = postType;

  const parentSlug = getParentSlug(posts, parentID);

  const slug = formatSlug(`${postTypeSlug}/${parentSlug}/${postSlug}`);

  return slug;
}
