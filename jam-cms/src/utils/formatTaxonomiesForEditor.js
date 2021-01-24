import { set } from 'lodash';

export default function formatTaxonomiesForEditor(post, site) {
  if (!post?.taxonomies || !site?.taxonomies) {
    return null;
  }

  const taxonomies = {};

  Object.keys(post.taxonomies).map((k) => {
    site.taxonomies[k].terms.map((o) => {
      if (post.taxonomies[k].includes(o.id)) {
        if (taxonomies[k]) {
          taxonomies[k].push(o);
        } else {
          taxonomies[k] = [o];
        }
      }
    });
  });

  return taxonomies;
}
