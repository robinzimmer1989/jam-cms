const path = require('path');
const axios = require('axios');
const fs = require('fs');

let templatesPath, globalOptionsPath;

exports.onPreInit = ({ store }, { templates, globalOptions }) => {
  const defaulTemplatesPath = `src/templates/index`;
  const defaulGlobalOptionsPath = `src/globalOptions`;

  if (!templates) {
    templates = path.join(store.getState().program.directory, defaulTemplatesPath);
  }

  templatesPath = templates;

  if (!globalOptions) {
    globalOptions = path.join(store.getState().program.directory, defaulGlobalOptionsPath);
  }

  globalOptionsPath = globalOptions;
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_TEMPLATES_PATH: JSON.stringify(templatesPath),
        GATSBY_GLOBAL_OPTIONS_PATH: JSON.stringify(globalOptionsPath),
      }),
    ],
  });
};

exports.createPages = async ({ actions, reporter, graphql }, pluginOptions) => {
  const { source, apiKey } = pluginOptions;

  if (!source) {
    reporter.error('jamCMS: Source url is required');
    return;
  }

  if (!apiKey) {
    reporter.error('jamCMS: Api key is required');
    return;
  }

  // Remove trailing slash
  const url = source.replace(/\/+$/, '');

  try {
    const response = await axios.get(`${url}/wp-json/jamcms/v1/getBuildSite?apiKey=${apiKey}`);

    const {
      data: { globalOptions },
    } = await response;

    // Get all post types
    const {
      data: { allWpContentType },
    } = await graphql(/* GraphQL */ `
      query ALL_CONTENT_TYPES {
        allWpContentType {
          nodes {
            graphqlSingleName
          }
        }
      }
    `);

    for (const contentType of allWpContentType.nodes) {
      const { graphqlSingleName: postType } = contentType;

      // Don't create single pages for media items
      if (postType === 'mediaItem') {
        continue;
      }

      // Capitalize post type name
      const nodesTypeName = postType.charAt(0).toUpperCase() + postType.slice(1);
      const gatsbyNodeListFieldName = `allWp${nodesTypeName}`;

      const { data } = await graphql(/* GraphQL */ `
        query ALL_CONTENT_NODES {
            ${gatsbyNodeListFieldName}{
            nodes {
              databaseId
              id
              uri
              template {
                templateName
              }
            }
          }
        }
      `);
      const { nodes } = data[gatsbyNodeListFieldName];

      // Initialize missing templates object
      const missingTemplates = {};

      await Promise.all(
        nodes.map(async (node, i) => {
          const {
            id,
            uri,
            template: { templateName },
          } = node;

          const templatePath = path.resolve(
            `./src/templates/postTypes/${postType}/${templateName.toLowerCase()}/${templateName.toLowerCase()}.js`
          );

          if (fs.existsSync(templatePath)) {
            await actions.createPage({
              component: templatePath,
              path: uri,
              context: { id, globalOptions },
            });
          } else {
            // Only show error message about missing template once
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for ${postType}/${templateName.toLowerCase()}`
              );
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
