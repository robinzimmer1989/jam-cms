import PageDefault from './postTypes/page/default';
import PageDocumentation from './postTypes/page/documentation';
import NewsDefault from './postTypes/news/default';

// import app components
import banner from '../components/banner/config';
import boxes from '../components/boxes/config';
import posts from '../components/posts/config';
import textimage from '../components/textImage/config';
import texteditor from '../components/textEditor/config';

const templates = {
  postTypes: {
    page: {
      default: {
        id: 'default',
        label: 'Default',
        component: PageDefault,
        fields: [
          {
            id: 'header',
            global: true,
          },
          {
            id: 'blocks',
            label: 'Content',
            type: 'group',
            fields: [
              {
                id: 'flex',
                label: 'Blocks',
                type: 'flexible_content',
                items: Object.values({
                  banner,
                  boxes,
                  posts,
                  textimage,
                  texteditor,
                }),
              },
            ],
          },
          {
            id: 'footer',
            global: true,
          },
        ],
      },
      documentation: {
        id: 'documentation',
        label: 'Documentation',
        component: PageDocumentation,
        fields: [
          {
            id: 'header',
            global: true,
          },
          {
            id: 'sidebar',
            global: true,
          },
          {
            id: 'content',
            label: 'Content',
            type: 'group',
            fields: [
              {
                id: 'title',
                label: 'Title',
                type: 'text',
              },
              {
                id: 'text',
                label: 'Text',
                type: 'wysiwyg',
              },
            ],
          },
          {
            id: 'footer',
            global: true,
          },
        ],
      },
    },
    news: {
      default: {
        id: 'default',
        label: 'News',
        component: NewsDefault,
        query: `
          query {
            posts {
              nodes {
                title
              }
            }
          }
        `,
        fields: [
          {
            id: 'header',
            global: true,
          },
          {
            id: 'text',
            label: 'Content',
            type: 'group',
            fields: texteditor.fields,
          },
          {
            id: 'footer',
            global: true,
          },
        ],
      },
    },
  },
  taxonomies: {},
};

export default templates;
