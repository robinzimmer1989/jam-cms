// import templates
import pageDefault from './templates/postTypes/page/default/config';
import pageTest from './templates/postTypes/page/test/config';
import postDefault from './templates/postTypes/post/default/config';
import postArchive from './templates/postTypes/post/archive/config';
import productDefault from './templates/postTypes/product/default/config';
import productArchive from './templates/postTypes/product/archive/config';

// import theme options
import header from './components/header/config';
import footer from './components/footer/config';

const fields = {
  postTypes: [
    {
      id: 'page',
      title: 'Page',
      templates: [pageDefault, pageTest],
    },
    {
      id: 'post',
      title: 'Post',
      templates: [postDefault, postArchive],
    },
    {
      id: 'product',
      title: 'Product',
      options: {
        rewrite_slug: 'products',
      },
      templates: [productDefault, productArchive],
    },
  ],
  taxonomies: [
    {
      id: 'category',
      title: 'Category',
      postTypes: ['post'],
    },
    {
      id: 'product_cat',
      title: 'Product Category',
      postTypes: ['product'],
    },
  ],
  themeOptions: [
    header,
    footer,
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
