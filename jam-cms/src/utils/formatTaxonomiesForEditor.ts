export default function formatTaxonomiesForEditor(post: any, site: any) {
  if (!post?.taxonomies || !site?.taxonomies) {
    return null;
  }

  const taxonomies = {} as any;

  Object.keys(post.taxonomies).map((k) => {
    const taxonomy = site?.taxonomies?.[k];

    if (!taxonomy) {
      return;
    }

    const { graphqlPluralName } = taxonomy;

    site.taxonomies[k].terms.map(({ id, title, uri, description, count, parentID }: any) => {
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
