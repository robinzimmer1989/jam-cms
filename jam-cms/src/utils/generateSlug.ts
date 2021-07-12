import formatSlug from './formatSlug';
import getParentSlug from './getParentSlug';

export default function generateSlug(
  postType: any,
  postID: any,
  frontPage: any,
  trailingSlash = false
) {
  if (postID === frontPage) {
    return trailingSlash ? '/' : '';
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

  const slug = formatSlug(`${postTypeSlug}/${parentSlug}/${postSlug}`, trailingSlash);

  return slug;
}
