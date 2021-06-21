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
      id: 'content',
      label: 'Content',
      type: 'group',
      fields: [
        {
          id: 'wysiwyg',
          type: 'wysiwyg',
          label: 'Text',
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
