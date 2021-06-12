const config = {
  id: 'default',
  postTypeID: 'post',
  label: 'Post Default',
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'text',
      label: 'Content',
      type: 'wysiwyg',
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};

export default config;
