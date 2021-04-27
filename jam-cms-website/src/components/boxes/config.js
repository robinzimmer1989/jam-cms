import Boxes from './Boxes';

const config = {
  id: 'boxes',
  label: 'Boxes',
  component: Boxes,
  fields: [
    {
      id: 'introduction',
      type: 'wysiwyg',
      label: 'Introduction',
    },
    {
      id: 'columns',
      type: 'number',
      label: 'Columns',
      defaultValue: 3,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      id: 'items',
      type: 'repeater',
      label: 'Items',
      items: [
        {
          id: 'image',
          type: 'image',
          label: 'Add Image',
        },
        {
          id: 'text',
          type: 'wysiwyg',
          label: 'Text',
          rows: 3,
        },
        {
          id: 'button',
          type: 'link',
          label: 'Button',
        },
      ],
    },
  ],
};

export default config;
