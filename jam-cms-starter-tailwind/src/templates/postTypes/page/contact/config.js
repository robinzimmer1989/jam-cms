const config = {
  id: 'contact',
  postTypeID: 'page',
  label: 'Contact',
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'text',
      type: 'text',
      label: 'Text',
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};

export default config;
