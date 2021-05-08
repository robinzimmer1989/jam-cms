import texteditor from '../../../../components/textEditor/config';

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
      type: 'group',
      fields: texteditor.fields,
    },
    {
      id: 'footer',
      global: true,
    },
  ],
};

export default config;
