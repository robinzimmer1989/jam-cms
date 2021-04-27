import TextImage from './TextImage';
import buttonFields from '../button/config';

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
      defaultValue:
        '<h2>Sustainable authentic polaroid</h2><p>Taxidermy fam whatever, hell of bespoke mustache try-hard health goth coloring book paleo jianbing +1 vice pitchfork. Mustache keytar butcher brunch XOXO hammock.</p>',
    },
    {
      id: 'buttons',
      type: 'repeater',
      label: 'Button',
      items: buttonFields,
      defaultValue: [
        {
          button: {
            title: 'Craft beer',
            url: '/',
          },
          variant: 'filled',
        },
        {
          button: {
            title: 'Glossier health',
            url: '/',
          },
          variant: 'text',
        },
      ],
    },
  ],
};

export default config;
