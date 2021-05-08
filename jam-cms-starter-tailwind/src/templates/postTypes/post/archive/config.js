const config = {
  id: 'archive',
  postTypeID: 'post',
  label: 'Post Archive',
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
      id: 'content',
      label: 'Content',
      type: 'group',
      fields: [
        {
          id: 'tag',
          type: 'text',
          label: 'Tag',
          defaultValue: 'Mustache try-hard',
        },
        {
          id: 'headline',
          type: 'text',
          label: 'Headline',
          defaultValue: 'Glossier chia salvia gastropub tote bag master',
        },
        {
          id: 'text',
          type: 'text',
          label: 'Text',
          defaultValue:
            'Next level cred squid, butcher kombucha woke vexillologist art party poke. Mlkshk flannel tbh DIY.',
        },
      ],
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};

export default config;
