const config = [
  {
    id: 'button',
    type: 'link',
    label: 'Button',
  },
  {
    id: 'variant',
    type: 'select',
    label: 'Variant',
    defaultValue: 'filled',
    options: [
      {
        name: 'Filled',
        value: 'filled',
      },
      {
        name: 'Outlined',
        value: 'outlined',
      },
    ],
  },
];

export default config;
