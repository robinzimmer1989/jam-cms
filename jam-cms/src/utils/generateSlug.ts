import formatSlug from './formatSlug';
import getParentSlug from './getParentSlug';

const generatePostSlug = ({ site, postTypeID, postID, leadingSlash, trailingSlash }: any) => {
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
          [postID]: { slug: postSlug, parentID, language, translations },
        },
      },
    },
  } = site;

  const parentSlug = getParentSlug(posts, parentID);

  // Get language slug if applicable
  let languageSlug = '';

  if (
    language &&
    site?.languages?.defaultLanguage &&
    site?.languages?.postTypes.find((s: string) => s === postTypeID) &&
    site.languages.defaultLanguage !== language
  ) {
    languageSlug = site?.languages?.languages.find((o: any) => o.slug === language)?.slug;
  }

  // Check if the translation of the default language equals the front page id
  // If this is the case the post is a front page as well (i.e. "/en")
  if (translations?.[site?.languages?.defaultLanguage] === site?.frontPage) {
    return formatSlug(languageSlug, leadingSlash, trailingSlash);
  }

  return formatSlug(
    `${languageSlug}/${postTypeSlug}/${parentSlug}/${postSlug}`,
    leadingSlash,
    trailingSlash
  );
};

const generateTermSlug = ({ site, taxonomyID, termID, leadingSlash, trailingSlash }: any) => {
  const {
    taxonomies: {
      [taxonomyID]: {
        slug: taxonomySlug,
        terms,
        terms: {
          [termID]: { slug: termSlug, parentID, language },
        },
      },
    },
  } = site;

  const parentSlug = getParentSlug(terms, parentID);

  // Get language slug if applicable
  let languageSlug = '';

  if (
    language &&
    site?.languages?.defaultLanguage &&
    site?.languages?.taxonomies.find((s: string) => s === taxonomyID) &&
    site.languages.defaultLanguage !== language
  ) {
    languageSlug = site?.languages?.languages.find((o: any) => o.slug === language)?.slug;
  }

  return formatSlug(
    `${languageSlug}/${taxonomySlug}/${parentSlug}/${termSlug}`,
    leadingSlash,
    trailingSlash
  );
};

export default function generateSlug({
  site,
  postTypeID,
  postID,
  taxonomyID,
  termID,
  leadingSlash = false,
  trailingSlash = false,
}: any) {
  if (postTypeID && postID) {
    return generatePostSlug({
      site,
      postTypeID,
      postID,
      leadingSlash,
      trailingSlash,
    });
  } else if (taxonomyID && termID) {
    return generateTermSlug({
      site,
      taxonomyID,
      termID,
      leadingSlash,
      trailingSlash,
    });
  }

  return '';
}
