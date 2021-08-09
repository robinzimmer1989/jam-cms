import path from 'path';

// import app components
import getTemplatePath from './getTemplatePath';
import fragments from './fragments';
import casing from './casing';

const createJamTerms = async (
  { actions, reporter, graphql },
  {},
  { siteTitle, themeOptions, activePlugins, languages, jamCMS }
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
      const nodesTypeName = casing(graphqlSingleName, 'pascal');
      const gatsbyNodeListFieldName = `allWp${nodesTypeName}`;

      // Prepare fragments
      const seoFragment = activePlugins.includes('yoast') ? fragments.seo : '';

      const languageFragment =
        activePlugins.includes('polylang') && languages?.taxonomies?.includes(graphqlSingleName)
          ? fragments.languageTerm
          : '';

      const { data } = await graphql(/* GraphQL */ `
        query ALL_TERM_NODES {
          ${gatsbyNodeListFieldName}{
            nodes {
              id
              databaseId
              slug
              uri
              ${seoFragment}
              ${languageFragment}
            }
          }
        }
      `);

      await Promise.all(
        data[gatsbyNodeListFieldName].nodes.map(async (node, i) => {
          if (!node) {
            return;
          }

          const templatePath = getTemplatePath({
            prefix: `taxonomies/${casing(graphqlSingleName)}`,
            template: 'single',
          });

          if (templatePath) {
            const { id, databaseId, slug, uri } = node;

            const context = {
              id,
              databaseId,
              slug,
              siteTitle,
              themeOptions,
              jamCMS,
              pagination: {},
            };

            if (activePlugins.includes('yoast')) {
              context.seo = node.seo;
            }

            if (
              activePlugins.includes('polylang') &&
              languages?.taxonomies?.includes(graphqlSingleName)
            ) {
              context.language = node.language;
              context.translations = node.translations;
            }

            actions.createPage({
              component: path.resolve(`./${templatePath}`),
              path: uri,
              context,
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

export default createJamTerms;
