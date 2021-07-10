export default function getParentSlug(posts: any, parentID: any, slug = '') {
  let newSlug = `/${slug}`;

  if (parentID && posts[parentID]) {
    const parentSlug = `${posts[parentID].slug}${newSlug}`;
    newSlug = getParentSlug(posts, posts[parentID].parentID, parentSlug);
  }

  return newSlug;
}
