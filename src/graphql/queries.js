/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
      id
      ownerID
      title
      settings
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
      menus {
        items {
          id
          siteID
          slug
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
        menus {
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
export const getMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
      id
      siteID
      slug
      createdAt
      updatedAt
      owner
      menuItems {
        items {
          id
          siteID
          menuID
          position
          postID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listMenus = /* GraphQL */ `
  query ListMenus(
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        slug
        createdAt
        updatedAt
        owner
        menuItems {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getMenuItem = /* GraphQL */ `
  query GetMenuItem($id: ID!) {
    getMenuItem(id: $id) {
      id
      siteID
      menuID
      position
      postID
      createdAt
      updatedAt
      post {
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
      owner
    }
  }
`;
export const listMenuItems = /* GraphQL */ `
  query ListMenuItems(
    $filter: ModelMenuItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenuItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        siteID
        menuID
        position
        postID
        createdAt
        updatedAt
        post {
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
        owner
      }
      nextToken
    }
  }
`;
