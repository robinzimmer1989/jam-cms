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
      redirects
      netlifyID
      netlifyUrl
      customDomain
      apiKey
      createdAt
      updatedAt
      owner
      postTypes {
        items {
          id
          siteID
          title
          slug
          template
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
          featuredImage
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
      redirects
      netlifyID
      netlifyUrl
      customDomain
      apiKey
      createdAt
      updatedAt
      owner
      postTypes {
        items {
          id
          siteID
          title
          slug
          template
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
          featuredImage
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
      redirects
      netlifyID
      netlifyUrl
      customDomain
      apiKey
      createdAt
      updatedAt
      owner
      postTypes {
        items {
          id
          siteID
          title
          slug
          template
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
          featuredImage
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
      template
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
          featuredImage
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
      template
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
          featuredImage
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
      template
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
          featuredImage
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
      featuredImage
      createdAt
      updatedAt
      postType {
        id
        siteID
        title
        slug
        template
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
      featuredImage
      createdAt
      updatedAt
      postType {
        id
        siteID
        title
        slug
        template
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
      featuredImage
      createdAt
      updatedAt
      postType {
        id
        siteID
        title
        slug
        template
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
export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
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
export const updateForm = /* GraphQL */ `
  mutation UpdateForm(
    $input: UpdateFormInput!
    $condition: ModelFormConditionInput
  ) {
    updateForm(input: $input, condition: $condition) {
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
export const deleteForm = /* GraphQL */ `
  mutation DeleteForm(
    $input: DeleteFormInput!
    $condition: ModelFormConditionInput
  ) {
    deleteForm(input: $input, condition: $condition) {
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
export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
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
export const updateEntry = /* GraphQL */ `
  mutation UpdateEntry(
    $input: UpdateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    updateEntry(input: $input, condition: $condition) {
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
export const deleteEntry = /* GraphQL */ `
  mutation DeleteEntry(
    $input: DeleteEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    deleteEntry(input: $input, condition: $condition) {
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
