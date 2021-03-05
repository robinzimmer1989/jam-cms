import Banner from './Banner';
import { fields as buttonFields } from '../Button';

const config = {
  id: 'banner',
  label: 'Banner',
  component: Banner,
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
    {
      id: 'height',
      type: 'select',
      label: 'Height',
      defaultValue: 'small',
      options: [
        {
          name: 'Small',
          value: 'small',
        },
        {
          name: 'Big',
          value: 'big',
        },
      ],
    },
  ],
};

export default config;
