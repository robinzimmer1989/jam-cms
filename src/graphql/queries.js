/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
      id
      ownerID
      title
      settings
      redirects
      netlifyID
      netlifyUrl
      createdAt
      updatedAt
      owner
      postTypes {
        items {
          id
          siteID
          title
          slug
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      posts {
        items {
          id
          siteID
          slug
          parentID
          postTypeID
          status
          title
          content
          seoTitle
          seoDescription
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      mediaItems {
        items {
          id
          siteID
          title
          mimeType
          storageKey
          altText
          width
          height
          fileSize
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      forms {
        items {
          id
          siteID
          title
          content
          settings
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listSites = /* GraphQL */ `
  query ListSites(
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerID
        title
        settings
        redirects
        netlifyID
        netlifyUrl
        createdAt
        updatedAt
        owner
        postTypes {
          nextToken
        }
        posts {
          nextToken
        }
        mediaItems {
          nextToken
        }
        forms {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listPostTypes = /* GraphQL */ `
  query ListPostTypes(
    $filter: ModelPostTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        title
        slug
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPostType = /* GraphQL */ `
  query GetPostType($id: ID!) {
    getPostType(id: $id) {
      id
      siteID
      title
      slug
      createdAt
      updatedAt
      owner
      posts {
        items {
          id
          siteID
          slug
          parentID
          postTypeID
          status
          title
          content
          seoTitle
          seoDescription
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      siteID
      slug
      parentID
      postTypeID
      status
      title
      content
      seoTitle
      seoDescription
      createdAt
      updatedAt
      postType {
        id
        siteID
        title
        slug
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        slug
        parentID
        postTypeID
        status
        title
        content
        seoTitle
        seoDescription
        createdAt
        updatedAt
        postType {
          id
          siteID
          title
          slug
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const getMediaItem = /* GraphQL */ `
  query GetMediaItem($id: ID!) {
    getMediaItem(id: $id) {
      id
      siteID
      title
      mimeType
      storageKey
      altText
      width
      height
      fileSize
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMediaItems = /* GraphQL */ `
  query ListMediaItems(
    $filter: ModelMediaItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMediaItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        title
        mimeType
        storageKey
        altText
        width
        height
        fileSize
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      siteID
      title
      content
      settings
      createdAt
      updatedAt
      owner
      entries {
        items {
          id
          siteID
          formID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        title
        content
        settings
        createdAt
        updatedAt
        owner
        entries {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      id
      siteID
      formID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEntrys = /* GraphQL */ `
  query ListEntrys(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        formID
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
