const config = {
  id: 'footer',
  label: 'Footer',
  type: 'group',
  fields: [
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Description',
    },
    {
      id: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      id: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      id: 'address',
      type: 'text',
      label: 'Address',
    },
    {
      id: 'github',
      type: 'text',
      label: 'Github',
    },
    {
      id: 'footermenu',
      type: 'menu',
      label: 'Menu',
    },
  ],
};

export default config;
