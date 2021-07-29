import formatSlug from './formatSlug';
import getParentSlug from './getParentSlug';

export default function generateSlug({
  site,
  postTypeID,
  postID,
  leadingSlash = false,
  trailingSlash = false,
}: any) {
  if (postID === site?.frontPage) {
    return leadingSlash ? '/' : '';
  }

  if (!site?.postTypes?.[postTypeID]?.posts?.[postID]) {
    return '';
  }

  const {
    postTypes: {
      [postTypeID]: {
        slug: postTypeSlug,
        posts,
        posts: {
          [postID]: { slug: postSlug, parentID, language },
        },
      },
    },
  } = site;

  const parentSlug = getParentSlug(posts, parentID);

  let languageSlug = '';

  if (
    language &&
    site?.languages?.defaultLanguage &&
    site?.languages?.postTypes.find((s: string) => s === postTypeID) &&
    site.languages.defaultLanguage !== language
  ) {
    languageSlug = site?.languages?.languages.find((o: any) => o.slug === language)?.slug;
  }

  const slug = formatSlug(
    `${languageSlug}/${postTypeSlug}/${parentSlug}/${postSlug}`,
    leadingSlash,
    trailingSlash
  );

  return slug;
}
