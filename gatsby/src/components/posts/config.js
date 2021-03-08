import Posts from './Posts';

const config = {
  id: 'posts',
  label: 'Posts',
  component: Posts,
  fields: [
    {
      id: 'buttontitle',
      type: 'text',
      defaultValue: 'Read More',
      label: 'Button Title',
    },
    {
      id: 'numberofposts',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 3,
      min: -1,
      step: 2,
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
  ],
};

export default config;
