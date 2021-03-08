import Template from './documentation';

const config = {
  id: 'documentation',
  postTypeID: 'page',
  label: 'Documentation',
  component: Template,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'sidebar',
      global: true,
    },
    {
      id: 'content',
      label: 'Content',
      type: 'group',
      fields: [
        {
          id: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          id: 'text',
          label: 'Text',
          type: 'wysiwyg',
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
