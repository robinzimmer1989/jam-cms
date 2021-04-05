import Template from './archive';

const config = {
  id: 'archive',
  postTypeID: 'post',
  label: 'Post',
  component: Template,
  query: `{
    allWpPost: posts {
      nodes {
        id
        title
        uri
        featuredImage {
          node {
            altText
            srcSet
            sourceUrl
            mediaType
            sizes
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }`,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};

export default config;
