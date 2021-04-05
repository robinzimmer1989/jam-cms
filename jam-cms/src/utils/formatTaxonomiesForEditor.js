export default function formatTaxonomiesForEditor(post, site) {
  if (!post?.taxonomies || !site?.taxonomies) {
    return null;
  }

  const taxonomies = {};

  Object.keys(post.taxonomies).map((k) => {
    const { graphqlPluralName } = site.taxonomies[k];

    site.taxonomies[k].terms.map(({ id, title, uri, description, count, parentID }) => {
      if (post.taxonomies[k].includes(id)) {
        const taxonomy = {
          id,
          databaseId: id,
          name: title,
          uri,
          description,
          count,
          parentId: parentID,
        };

        if (taxonomies[graphqlPluralName]) {
          taxonomies[graphqlPluralName].nodes.push(taxonomy);
        } else {
          taxonomies[graphqlPluralName] = { nodes: [taxonomy] };
        }
      }
    });
  });

  return taxonomies;
}
