/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSite = /* GraphQL */ `
  mutation CreateSite(
    $input: CreateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    createSite(input: $input, condition: $condition) {
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
export const updateSite = /* GraphQL */ `
  mutation UpdateSite(
    $input: UpdateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    updateSite(input: $input, condition: $condition) {
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
export const deleteSite = /* GraphQL */ `
  mutation DeleteSite(
    $input: DeleteSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    deleteSite(input: $input, condition: $condition) {
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
export const createPostType = /* GraphQL */ `
  mutation CreatePostType(
    $input: CreatePostTypeInput!
    $condition: ModelPostTypeConditionInput
  ) {
    createPostType(input: $input, condition: $condition) {
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
export const updatePostType = /* GraphQL */ `
  mutation UpdatePostType(
    $input: UpdatePostTypeInput!
    $condition: ModelPostTypeConditionInput
  ) {
    updatePostType(input: $input, condition: $condition) {
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
export const deletePostType = /* GraphQL */ `
  mutation DeletePostType(
    $input: DeletePostTypeInput!
    $condition: ModelPostTypeConditionInput
  ) {
    deletePostType(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createMediaItem = /* GraphQL */ `
  mutation CreateMediaItem(
    $input: CreateMediaItemInput!
    $condition: ModelMediaItemConditionInput
  ) {
    createMediaItem(input: $input, condition: $condition) {
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
export const updateMediaItem = /* GraphQL */ `
  mutation UpdateMediaItem(
    $input: UpdateMediaItemInput!
    $condition: ModelMediaItemConditionInput
  ) {
    updateMediaItem(input: $input, condition: $condition) {
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
export const deleteMediaItem = /* GraphQL */ `
  mutation DeleteMediaItem(
    $input: DeleteMediaItemInput!
    $condition: ModelMediaItemConditionInput
  ) {
    deleteMediaItem(input: $input, condition: $condition) {
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
export const createMenu = /* GraphQL */ `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
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
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
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
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
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
export const createMenuItem = /* GraphQL */ `
  mutation CreateMenuItem(
    $input: CreateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    createMenuItem(input: $input, condition: $condition) {
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
export const updateMenuItem = /* GraphQL */ `
  mutation UpdateMenuItem(
    $input: UpdateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    updateMenuItem(input: $input, condition: $condition) {
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
export const deleteMenuItem = /* GraphQL */ `
  mutation DeleteMenuItem(
    $input: DeleteMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    deleteMenuItem(input: $input, condition: $condition) {
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
