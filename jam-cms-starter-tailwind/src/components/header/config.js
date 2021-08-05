const config = {
  id: 'header',
  label: 'Header',
  type: 'group',
  fields: [
    {
      id: 'logo',
      type: 'image',
      label: 'Logo',
    },
    {
      id: 'menu',
      type: 'menu',
      label: 'Menu',
      maxLevel: 2,
    },
  ],
};

export default config;
