import path from 'path';
import fs from 'fs';
import axios from 'axios';

import getThemeSettings from './getThemeSettings';

let fieldsPath,
  templatesPath,
  hasError = false;

export const onPreInit = async ({ store, reporter }, { fields, source, apiKey, settings }) => {
  if (!apiKey) {
    reporter.error('jamCMS: Api key is required');
    return;
  }

  if (!source) {
    reporter.error('jamCMS: Source URL is required');
    return;
  }

  // import templates
  templatesPath = path.join(store.getState().program.directory, `src/templates`);

  // Use default path if no fields variable is provided
  fieldsPath = fields || path.join(store.getState().program.directory, `src/fields`);

  // Don't sync if setting is explicitly set to false
  if (settings && settings.sync === false) {
    return reporter.info('jamCMS: Syncing disabled');
  }

  // Import field object
  const fieldsObject = await import(fieldsPath);

  if (!fieldsObject) {
    return reporter.error('jamCMS: No fields object found');
  }

  // Remove potential trailing slash
  const url = source.replace(/\/+$/, '');

  // Sync fields with backend
  try {
    const result = await axios.post(`${url}/wp-json/jamcms/v1/syncFields?apiKey=${apiKey}`, {
      fields: JSON.stringify(fieldsObject.default),
    });

    if (result.data) {
      reporter.success(result.data);
    }
  } catch (err) {
    hasError = true;

    if (err?.response?.data?.code === 'rest_no_route') {
      reporter.error('jamCMS: Plugin not found');
    } else {
      reporter.error(err?.response?.data?.message);
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

export const createPages = async ({ store, actions, reporter, graphql }, pluginOptions) => {
  if (hasError) {
    return;
  }

  const { settings, fields } = pluginOptions;

  // Prepare jamCMS object with default values for page context
  const jamCMS = {
    sidebar: {
      active: false,
      width: 320,
      position: 'left',
      defaultOpen: false,
      style: 'inline',
    },
  };

  // Use default path if no fields variable is provided
  fieldsPath = fields || path.join(store.getState().program.directory, `src/fields`);

  // Import field object
  const fieldsObject = await import(fieldsPath);

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

  const allowedExtensions = ['.js', '.jsx', '.tsx'];

  const getPath = (type, postType, templateName) => {
    let thePath;

    for (const extension of allowedExtensions) {
      const templatePath = path.resolve(
        `./src/templates/${type}/${postType}/${templateName.toLowerCase()}/${templateName.toLowerCase()}${extension}`
      );

      if (fs.existsSync(templatePath)) {
        thePath = templatePath;
      }
    }

    return thePath;
  };

  await Promise.all(
    Object.keys(allNodes).map(async (postType) => {
      await Promise.all(
        allNodes[postType].map(async (node, i) => {
          let {
            id,
            uri,
            template: { templateName },
          } = node;

          const isArchive = templateName.startsWith('Archive');
          const archivePostType = templateName.replace('Archive', '').toLowerCase();

          let templatePath;

          if (isArchive) {
            templatePath = getPath('postTypes', archivePostType, 'archive');
          } else {
            templatePath = getPath('postTypes', postType, templateName);
          }

          if (fs.existsSync(templatePath)) {
            if (isArchive) {
              const numberOfPosts = allNodes[archivePostType].length;

              let postsPerPageUsed = 10;

              if (settings && settings.postsPerPage) {
                postsPerPageUsed = settings.postsPerPage;
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
                      basePath: themeOptions?.frontPage === id ? '/' : uri,
                      numberOfPosts,
                      postsPerPage: postsPerPageUsed,
                      numberOfPages: Math.ceil(numberOfPosts / postsPerPageUsed),
                      page,
                    },
                    jamCMS,
                  },
                });
              }
            } else {
              actions.createPage({
                component: templatePath,
                path: uri,
                context: { id, themeOptions, pagination: {}, jamCMS },
              });
            }
          } else {
            // Check if error was already shown
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for template '${templateName.toLowerCase()}' of post type '${postType}'. Add a template file to ${templatePath}`
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
          const templatePath = getPath('taxonomies', graphqlSingleName, 'single');

          if (fs.existsSync(templatePath)) {
            const { uri, slug, id } = node;

            actions.createPage({
              component: templatePath,
              path: uri,
              context: { id, slug, themeOptions, jamCMS },
            });
          } else {
            // Check if error was already shown
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for taxonomy '${graphqlSingleName}'. Add a template file to ${templatePath}`
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
