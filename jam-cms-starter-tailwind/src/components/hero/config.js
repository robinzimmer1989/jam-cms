import buttonFields from '../button/config';

const config = {
  id: 'hero',
  label: 'Hero',
  fields: [
    {
      id: 'image',
      type: 'image',
      label: 'Image',
    },
    {
      id: 'headline',
      type: 'text',
      label: 'Headline',
    },
    {
      id: 'subline',
      type: 'text',
      label: 'Subline',
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
