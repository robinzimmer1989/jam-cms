import TextImage from './TextImage';

const config = {
  id: 'textimage',
  label: 'Text & Image',
  component: TextImage,
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Edit Image',
    },
    {
      id: 'alignment',
      type: 'select',
      label: 'Image Alignment',
      defaultValue: 'left',
      options: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
    },
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Text',
    },
    {
      id: 'buttons',
      type: 'repeater',
      label: 'Buttons',
      items: [
        {
          id: 'button',
          type: 'link',
          label: 'Button',
        },
        {
          id: 'variant',
          type: 'select',
          label: 'Variant',
          defaultValue: 'filled',
          options: [
            {
              name: 'Filled',
              value: 'filled',
            },
            {
              name: 'Outlined',
              value: 'outlined',
            },
          ],
        },
      ],
    },
  ],
};

export default config;
