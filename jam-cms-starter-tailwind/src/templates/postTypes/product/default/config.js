const config = {
  id: 'default',
  postTypeID: 'product',
  label: 'Product',
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'description',
      type: 'wysiwyg',
      label: 'Description',
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};

export default config;
