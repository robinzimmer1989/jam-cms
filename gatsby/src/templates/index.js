import { PageDefault } from './postTypes/page/default';
import { PageDocumentation } from './postTypes/page/documentation';
import { NewsDefault } from './postTypes/news/default';

export default {
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
