import produce from 'immer';
import { get } from 'lodash';

// import app components
import defaults from '../defaults';

export default function formatSite(site) {
  const nextSite = produce(site, (draft) => {
    // Convert posts and then post types to object structure
    if (get(draft, `postTypes.items`)) {
      draft.postTypes.items.map((o, i) => {
        if (get(o, `posts.items`)) {
          return (draft.postTypes.items[i].posts = draft.postTypes.items[i].posts.items.reduce(
            (ac, a) => ({
              ...ac,
              [a.id]: a,
            }),
            {}
          ));
        }

        return null;
      });

      draft.postTypes = draft.postTypes.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {});
    }

    // Convert taxonomies to object structure
    if (get(draft, `taxonomies.items`)) {
      draft.taxonomies = draft.taxonomies.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {});
    }

    // Merge options stored in CMS with editor options to allow for future compatibility
    // TODO: Use deep merge function
    draft.editorOptions = {
      sidebar: { ...defaults.editorOptions.sidebar, ...draft?.editorOptions?.sidebar },
    };
  });

  return nextSite;
}
