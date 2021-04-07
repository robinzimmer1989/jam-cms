import Template from './default';

import banner from '../../../../components/banner/config';
import boxes from '../../../../components/boxes/config';
import textimage from '../../../../components/textImage/config';
import texteditor from '../../../../components/textEditor/config';
import form from '../../../../components/form/config';

const config = {
  id: 'default',
  postTypeID: 'page',
  label: 'Default',
  component: Template,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'blocks',
      label: 'Content',
      type: 'group',
      fields: [
        {
          id: 'flex',
          label: 'Blocks',
          type: 'flexible_content',
          items: Object.values({
            banner,
            boxes,
            textimage,
            texteditor,
            form,
          }),
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
