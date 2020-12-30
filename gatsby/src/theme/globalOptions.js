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
  {
    id: 'sidebarmenu',
    label: 'Sidebar Menu',
    type: 'menu',
    hide: true,
  },
  {
    id: 'footer',
    label: 'Footer',
    type: 'group',
    hide: true,
    fields: [
      {
        id: 'footermenu',
        type: 'menu',
        label: 'Menu',
      },
    ],
  },
];
