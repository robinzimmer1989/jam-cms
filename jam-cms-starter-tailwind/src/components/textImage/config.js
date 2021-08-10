import buttonFields from '../button/config';

const config = {
  id: 'textimage',
  label: 'Text & Image',
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
      id: 'size',
      type: 'select',
      label: 'Image Size',
      defaultValue: 'cover',
      options: [
        {
          name: 'Cover',
          value: 'cover',
        },
        {
          name: 'Contain',
          value: 'contain',
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
      label: 'Button',
      items: buttonFields,
    },
  ],
};

export default config;
