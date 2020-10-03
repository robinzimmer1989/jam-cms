/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSite = /* GraphQL */ `
  subscription OnCreateSite($owner: String) {
    onCreateSite(owner: $owner) {
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
export const onUpdateSite = /* GraphQL */ `
  subscription OnUpdateSite($owner: String) {
    onUpdateSite(owner: $owner) {
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
export const onDeleteSite = /* GraphQL */ `
  subscription OnDeleteSite($owner: String) {
    onDeleteSite(owner: $owner) {
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
export const onCreatePostType = /* GraphQL */ `
  subscription OnCreatePostType($owner: String) {
    onCreatePostType(owner: $owner) {
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
export const onUpdatePostType = /* GraphQL */ `
  subscription OnUpdatePostType($owner: String) {
    onUpdatePostType(owner: $owner) {
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
export const onDeletePostType = /* GraphQL */ `
  subscription OnDeletePostType($owner: String) {
    onDeletePostType(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
      id
      siteID
      slug
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
      id
      siteID
      slug
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
      id
      siteID
      slug
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
export const onCreateMediaItem = /* GraphQL */ `
  subscription OnCreateMediaItem($owner: String) {
    onCreateMediaItem(owner: $owner) {
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
export const onUpdateMediaItem = /* GraphQL */ `
  subscription OnUpdateMediaItem($owner: String) {
    onUpdateMediaItem(owner: $owner) {
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
export const onDeleteMediaItem = /* GraphQL */ `
  subscription OnDeleteMediaItem($owner: String) {
    onDeleteMediaItem(owner: $owner) {
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
