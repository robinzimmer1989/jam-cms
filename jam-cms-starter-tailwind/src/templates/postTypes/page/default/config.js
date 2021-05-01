import Template from './default';

// import fleixble content blocks
import hero from '../../../../components/hero/config';
import cards from '../../../../components/cards/config';
import textimage from '../../../../components/textImage/config';
import texteditor from '../../../../components/textEditor/config';

const config = {
  id: 'default',
  postTypeID: 'page',
  label: 'Default Page',
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
            hero,
            cards,
            textimage,
            texteditor,
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
