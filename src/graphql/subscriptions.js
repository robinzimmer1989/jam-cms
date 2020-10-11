/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSite = /* GraphQL */ `
  subscription OnCreateSite($owner: String) {
    onCreateSite(owner: $owner) {
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
          fields
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
export const onUpdateSite = /* GraphQL */ `
  subscription OnUpdateSite($owner: String) {
    onUpdateSite(owner: $owner) {
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
          fields
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
export const onDeleteSite = /* GraphQL */ `
  subscription OnDeleteSite($owner: String) {
    onDeleteSite(owner: $owner) {
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
          fields
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreateForm = /* GraphQL */ `
  subscription OnCreateForm($owner: String) {
    onCreateForm(owner: $owner) {
      id
      siteID
      title
      fields
      settings
      createdAt
      updatedAt
      owner
      entries {
        items {
          id
          siteID
          formID
          email
          fields
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onUpdateForm = /* GraphQL */ `
  subscription OnUpdateForm($owner: String) {
    onUpdateForm(owner: $owner) {
      id
      siteID
      title
      fields
      settings
      createdAt
      updatedAt
      owner
      entries {
        items {
          id
          siteID
          formID
          email
          fields
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onDeleteForm = /* GraphQL */ `
  subscription OnDeleteForm($owner: String) {
    onDeleteForm(owner: $owner) {
      id
      siteID
      title
      fields
      settings
      createdAt
      updatedAt
      owner
      entries {
        items {
          id
          siteID
          formID
          email
          fields
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry($owner: String) {
    onCreateEntry(owner: $owner) {
      id
      siteID
      formID
      email
      fields
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry($owner: String) {
    onUpdateEntry(owner: $owner) {
      id
      siteID
      formID
      email
      fields
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry($owner: String) {
    onDeleteEntry(owner: $owner) {
      id
      siteID
      formID
      email
      fields
      createdAt
      updatedAt
      owner
    }
  }
`;
