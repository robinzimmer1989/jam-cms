import PageDefault from './postTypes/page/default/config';
import PageDocumentation from './postTypes/page/documentation/config';
import PostDefault from './postTypes/post/default/config';
import PostArchive from './postTypes/post/archive/config';

const templates = {
  postTypes: {
    page: {
      default: PageDefault,
      documentation: PageDocumentation,
    },
    post: {
      default: PostDefault,
      archive: PostArchive,
    },
  },
};

export default templates;
