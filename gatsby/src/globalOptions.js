const globalOptions = [
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
    id: 'sidebar',
    label: 'Sidebar',
    type: 'group',
    hide: true,
    fields: [
      {
        id: 'sidebarmenu',
        label: 'Sidebar Menu',
        type: 'menu',
      },
    ],
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
  {
    id: 'colors',
    label: 'Colors',
    type: 'group',
    fields: [
      {
        id: 'primary',
        type: 'color_picker',
        label: 'Primary Color',
      },
      {
        id: 'primarycontrast',
        type: 'color_picker',
        label: 'Primary Contrast Color',
      },
      {
        id: 'secondary',
        type: 'color_picker',
        label: 'Secondary Color',
      },
      {
        id: 'secondarycontrast',
        type: 'color_picker',
        label: 'Secondary Contrast Color',
      },
      {
        id: 'background',
        type: 'color_picker',
        label: 'Background Color',
      },
    ],
  },
];

export default globalOptions;
