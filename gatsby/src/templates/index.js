import PageDefault from './postTypes/page/default/config';
import PageDocumentation from './postTypes/page/documentation/config';
import NewsDefault from './postTypes/news/default/config';

const templates = {
  postTypes: {
    page: {
      default: PageDefault,
      documentation: PageDocumentation,
    },
    news: {
      default: NewsDefault,
    },
  },
  taxonomies: {},
};

export default templates;
