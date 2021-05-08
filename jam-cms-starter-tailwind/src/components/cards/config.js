const config = {
  id: 'cards',
  label: 'Cards',
  fields: [
    {
      id: 'introduction',
      type: 'wysiwyg',
      label: 'Introduction',
      defaultValue:
        '<h3>Chartreuse coloring book shabby chic, pabst sriracha forage vinyl raclette</h3><p>Lomo squid craft beer, celiac occupy asymmetrical bespoke. Air plant palo santo sriracha messenger bag poke single-origin coffee butcher tattooed shabby chic venmo fingerstache aesthetic.</p>',
    },
    {
      id: 'columns',
      type: 'number',
      label: 'Columns',
      defaultValue: 3,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      id: 'items',
      type: 'repeater',
      label: 'Items',
      items: [
        {
          id: 'headline',
          type: 'text',
          label: 'Headline',
        },
        {
          id: 'text',
          type: 'text',
          label: 'Text',
          rows: 3,
        },
        {
          id: 'link',
          type: 'link',
          label: 'Link',
        },
      ],
    },
  ],
};

export default config;
