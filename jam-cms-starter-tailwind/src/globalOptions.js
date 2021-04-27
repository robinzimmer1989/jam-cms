import header from './components/header/config';
import footer from './components/footer/config';

const globalOptions = [
  header,
  footer,
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
    id: 'colors',
    label: 'Colors',
    type: 'group',
    fields: [
      {
        id: 'primary',
        type: 'color_picker',
        label: 'Primary Color',
        defaultValue: '#000000',
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
