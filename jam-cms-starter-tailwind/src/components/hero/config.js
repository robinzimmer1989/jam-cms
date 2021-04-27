import Hero from './Hero';
import buttonFields from '../button/config';

const config = {
  id: 'hero',
  label: 'Hero',
  component: Hero,
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
      defaultValue: 'Activated charcoal mustache typewriter copper mug',
    },
    {
      id: 'subline',
      type: 'text',
      label: 'Subline',
      defaultValue:
        'Viral pour-over ugh narwhal flexitarian raclette woke wayfarers direct trade godard yr kogi gentrify authentic',
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
