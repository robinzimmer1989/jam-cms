// import fleixble content blocks
import hero from '../../../../components/hero/config';
import cards from '../../../../components/cards/config';
import textimage from '../../../../components/textImage/config';
import texteditor from '../../../../components/textEditor/config';

const config = {
  id: 'default',
  label: 'Default Page',
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
};

export default config;
