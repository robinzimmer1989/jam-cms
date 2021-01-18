import { PageDefault } from './page/default';
import { PageDocumentation } from './page/documentation';
import { NewsDefault } from './news/default';

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
