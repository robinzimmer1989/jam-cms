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
    }
  `,
  languagePage: `
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
  languageTerm: `
    language {
      slug
      name
      locale
    }
    translations {
      name
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
