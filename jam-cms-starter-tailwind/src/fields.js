// import templates
import pageDefault from './templates/postTypes/page/default/config';
import postDefault from './templates/postTypes/post/default/config';
import postArchive from './templates/postTypes/post/archive/config';
import teamDefault from './templates/postTypes/team/default/config';

// import theme options
import header from './components/header/config';
import footer from './components/footer/config';

const fields = {
  postTypes: [
    {
      id: 'page',
      title: 'Page',
      templates: [pageDefault],
    },
    {
      id: 'post',
      title: 'News',
      templates: [postDefault, postArchive],
    },
    {
      id: 'team',
      title: 'Team',
      options: {
        rewrite_slug: 'team-member', // CPT only
      },
      templates: [teamDefault],
    },
  ],
  taxonomies: [
    {
      id: 'testing',
      title: 'Category 2',
      postTypes: ['post'],
      options: {
        rewrite_slug: 'this-is-a-test', // CPT only
      },
    },
  ],
  themeOptions: [
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
  ],
};

export default fields;
