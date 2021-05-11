import path from 'path';
import fs from 'fs';
import axios from 'axios';

import getThemeSettings from './getThemeSettings';

let fieldsPath, templatesPath;

export const onPreInit = async ({ store, reporter }, { fields, source, apiKey, sync = true }) => {
  if (!apiKey) {
    reporter.error('jamCMS: Api key is required');
    return;
  }

  if (!source) {
    reporter.error('jamCMS: Source URL is required');
    return;
  }

  // Use default path if no fields variable is provided
  fieldsPath = fields || path.join(store.getState().program.directory, `src/fields`);

  templatesPath = path.join(store.getState().program.directory, `src/templates`);

  // Import field object
  const fieldsObject = await import(fieldsPath);

  // Remove potential trailing slash
  const url = source.replace(/\/+$/, '');

  // Sync fields with backend
  if (sync && fieldsObject) {
    const result = await axios.post(`${url}/wp-json/jamcms/v1/syncFields?apiKey=${apiKey}`, {
      fields: JSON.stringify(fieldsObject.default),
    });

    if (result.data) {
      reporter.success(result.data);
    }
  }
};

export const onCreateWebpackConfig = ({ actions, plugins }) => {
  // Make field path variable globally available so we can import the templates in the wrap-page.js file (gatsby-browser only)
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_FIELDS_PATH: JSON.stringify(fieldsPath),
        GATSBY_TEMPLATES_PATH: JSON.stringify(templatesPath),
      }),
    ],
  });
};

export const createPages = async ({ actions, reporter, graphql }, pluginOptions) => {
  const themeOptions = await getThemeSettings({ reporter }, pluginOptions);

  const allNodes = {};

  try {
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

      allNodes[postType] = data[gatsbyNodeListFieldName].nodes;
    }
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.error(err.response.data.message);
    }
  }

  // Initialize missing templates object
  const missingTemplates = {};

  await Promise.all(
    Object.keys(allNodes).map(async (postType) => {
      await Promise.all(
        allNodes[postType].map(async (node, i) => {
          let {
            id,
            uri,
            template: { templateName },
          } = node;

          const isArchive = templateName.includes('Archive ');
          const archivePostType = templateName.replace('Archive ', '').toLowerCase();

          let templatePath;

          if (isArchive) {
            templatePath = path.resolve(
              `./src/templates/postTypes/${archivePostType}/archive/archive.js`
            );
          } else {
            templatePath = path.resolve(
              `./src/templates/postTypes/${postType}/${templateName.toLowerCase()}/${templateName.toLowerCase()}.js`
            );
          }

          if (fs.existsSync(templatePath)) {
            if (isArchive) {
              const numberOfPosts = allNodes[archivePostType].length;

              let postsPerPageUsed = 10;

              if (pluginOptions.settings && pluginOptions.settings.postsPerPage) {
                postsPerPageUsed = pluginOptions.settings.postsPerPage;
              }

              const numberOfPages = Math.ceil(numberOfPosts / postsPerPageUsed);

              for (let page = 1; page <= numberOfPages; page++) {
                let pathname = uri;

                if (page > 1) {
                  pathname = `${uri}page/${page}`;
                }

                actions.createPage({
                  component: templatePath,
                  path: pathname,
                  context: {
                    id,
                    themeOptions,
                    pagination: {
                      basePath: uri,
                      numberOfPosts,
                      postsPerPage: postsPerPageUsed,
                      numberOfPages: Math.ceil(numberOfPosts / postsPerPageUsed),
                      page,
                    },
                  },
                });
              }
            } else {
              actions.createPage({
                component: templatePath,
                path: uri,
                context: { id, themeOptions, pagination: {} },
              });
            }
          } else {
            // Check if error was already shown
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for ${postType}/${templateName.toLowerCase()}`
              );

              // Only show error message about missing template once
              missingTemplates[templatePath] = true;
            }
          }
        })
      );
    })
  );

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

      // Don't create single pages for media items
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
              slug
              uri
            }
          }
        }
      `);

      await Promise.all(
        data[gatsbyNodeListFieldName].nodes.map(async (node, i) => {
          const templatePath = path.resolve(
            `./src/templates/taxonomies/${graphqlSingleName}/single.js`
          );

          if (fs.existsSync(templatePath)) {
            const { uri, slug, id } = node;

            actions.createPage({
              component: templatePath,
              path: uri,
              context: { id, slug, themeOptions },
            });
          } else {
            // Check if error was already shown
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for taxonomy ${graphqlSingleName}`
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
