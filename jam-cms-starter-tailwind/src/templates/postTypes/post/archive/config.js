const config = {
  id: 'archive',
  postTypeID: 'post',
  label: 'Posts',
  query: `{
    allWpPost: posts {
      nodes {
        id
        title
        uri
        date
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
};

export default config;
