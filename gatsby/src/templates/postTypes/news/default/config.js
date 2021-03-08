import Template from './default';
import texteditor from '../../../../components/textEditor/config';

const config = {
  id: 'default',
  postTypeID: 'news',
  label: 'News',
  component: Template,
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
