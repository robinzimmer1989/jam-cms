export default [
  {
    id: 'header',
    label: 'Header',
    type: 'group',
    hide: true,
    fields: [
      {
        id: 'menu',
        type: 'menu',
        label: 'Menu',
      },
      {
        id: 'breakpoint',
        type: 'number',
        label: 'Breakpoint',
        defaultValue: 960,
      },
    ],
  },
];
