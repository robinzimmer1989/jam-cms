const fragments = {
  archive: `
    archive
    archivePostType
    archivePostsPerPage
  `,
  seo: `
    seo {
      title
      metaDesc
      metaRobotsNoindex
      opengraphImage {
        sourceUrl
      }
      fullHead
    }
  `,
  language: `
    language {
      slug
      name
      locale
    }
    translations {
      title
      uri
      language {
        slug
        name
        locale
      }
    }
  `,
  defaultLanguage: `
    defaultLanguage {
      id
      locale
      name
      slug
    }
  `,
};

export default fragments;
