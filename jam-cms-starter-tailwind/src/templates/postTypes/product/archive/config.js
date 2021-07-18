const config = {
  id: 'archive',
  label: 'Products',
  query: `{
    allWpProduct: allProduct {
      nodes {
        id
        title
        uri
        date
      }
    }
  }`,
  fields: [
    {
      id: 'tag',
      type: 'text',
      label: 'Tag',
    },
    {
      id: 'headline',
      type: 'text',
      label: 'Headline',
    },
    {
      id: 'text',
      type: 'text',
      label: 'Text',
    },
  ],
};

export default config;
