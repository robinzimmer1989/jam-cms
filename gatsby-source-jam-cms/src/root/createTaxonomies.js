import path from 'path';

import getTemplatePath from './getTemplatePath';

const createJamTaxonomies = async (
  { actions, reporter, graphql },
  {},
  { siteTitle, themeOptions, jamCMS, directory }
) => {
  try {
    // Get all taxonomies
    const {
      data: { allWpTaxonomy },
    } = await graphql(/* GraphQL */ `
      query ALL_TAXONOMIES {
        allWpTaxonomy {
          nodes {
            graphqlSingleName
          }
        }
      }
    `);

    for (const taxonomy of allWpTaxonomy.nodes) {
      const { graphqlSingleName } = taxonomy;

      // Don't create single pages for post format
      if (graphqlSingleName === 'postFormat') {
        continue;
      }

      // Capitalize post type name
      const nodesTypeName = graphqlSingleName.charAt(0).toUpperCase() + graphqlSingleName.slice(1);
      const gatsbyNodeListFieldName = `allWp${nodesTypeName}`;

      const { data } = await graphql(/* GraphQL */ `
        query ALL_TERM_NODES {
            ${gatsbyNodeListFieldName}{
            nodes {
              id
              databaseId
              slug
              uri
              status
            }
          }
        }
      `);

      await Promise.all(
        data[gatsbyNodeListFieldName].nodes.map(async (node, i) => {
          const templatePath = getTemplatePath(directory, {
            prefix: `taxonomies/${graphqlSingleName}`,
            template: 'single',
          });

          if (templatePath) {
            const { id, databaseId, uri, slug } = node;

            actions.createPage({
              component: path.resolve(`./${templatePath}`),
              path: uri,
              context: { id, databaseId, siteTitle, slug, themeOptions, jamCMS },
            });
          } else {
            // Check if error was already shown
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for taxonomy '${graphqlSingleName}'.`
              );

              // Only show error message about missing template once
              missingTemplates[templatePath] = true;
            }
          }
        })
      );
    }
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.error(err.response.data.message);
    }
  }
};

export default createJamTaxonomies;
