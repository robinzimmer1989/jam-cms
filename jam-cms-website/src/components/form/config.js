import Form from './Form';

const config = {
  id: 'form',
  label: 'Form',
  component: Form,
  fields: [
    {
      id: 'formid',
      type: 'select',
      label: 'Select Form',
      defaultValue: 1,
      options: [
        {
          name: 'Contact',
          value: 1,
        },
      ],
    },
  ],
};

export default config;
