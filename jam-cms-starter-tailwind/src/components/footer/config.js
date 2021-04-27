const config = {
  id: 'footer',
  label: 'Footer',
  type: 'group',
  hide: true,
  fields: [
    {
      id: 'text',
      type: 'wysiwyg',
      label: 'Description',
      defaultValue:
        'Cray hell of bushwick disrupt kickstarter enamel pin offal narwhal poke freegan chia skateboard etsy truffaut echo park.',
    },
    {
      id: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: '123-456-7890',
    },
    {
      id: 'email',
      type: 'text',
      label: 'Email',
      defaultValue: 'robinzimmer1989@web.de',
    },
    {
      id: 'address',
      type: 'text',
      label: 'Address',
      defaultValue: 'Wolf skateboard selfies',
    },
    {
      id: 'github',
      type: 'text',
      label: 'Github',
      defaultValue: 'https://github.com/robinzimmer1989/jam-cms',
    },
    {
      id: 'footermenu',
      type: 'menu',
      label: 'Menu',
    },
  ],
};

export default config;
