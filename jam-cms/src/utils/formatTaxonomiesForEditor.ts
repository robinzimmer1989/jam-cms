export default function formatTaxonomiesForEditor(post: any, site: any) {
  if (!post?.taxonomies || !site?.taxonomies) {
    return null;
  }

  const taxonomies = {};

  Object.keys(post.taxonomies).map((k) => {
    const taxonomy = site?.taxonomies?.[k];

    if (!taxonomy) {
      return;
    }

    const { graphqlPluralName } = taxonomy;

    site.taxonomies[k].terms.map(({
      id,
      title,
      uri,
      description,
      count,
      parentID
    }: any) => {
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

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (taxonomies[graphqlPluralName]) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          taxonomies[graphqlPluralName].nodes.push(taxonomy);
        } else {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          taxonomies[graphqlPluralName] = { nodes: [taxonomy] };
        }
      }
    });
  });

  return taxonomies;
}
