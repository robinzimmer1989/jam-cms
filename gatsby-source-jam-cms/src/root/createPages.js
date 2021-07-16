import path from 'path';

import getTemplatePath from './getTemplatePath';

const createJamPages = async (
  { actions, reporter, graphql },
  { settings },
  { siteTitle, themeOptions, protectedPosts, jamCMS, directory }
) => {
  const allNodes = {};

  // Get path to private component
  const privatePath = getTemplatePath(directory, { prefix: 'protected', template: 'private' });

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
              id
              databaseId              
              uri
              status
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
      // Merge nodes of GraphQL query and protected posts from custom WP endpoint
      const array = protectedPosts
        ? allNodes[postType].concat(protectedPosts[postType])
        : allNodes[postType];

      await Promise.all(
        array.map(async (node, i) => {
          let { id, databaseId, uri, status, template } = node;

          if (!template || !template.templateName) {
            return;
          }

          const isArchive = template.templateName.startsWith('Archive');
          const archivePostType = template.templateName.replace('Archive', '').toLowerCase();

          const templatePath = isArchive
            ? getTemplatePath(directory, {
                prefix: `postTypes/${archivePostType}`,
                template: 'archive',
              })
            : getTemplatePath(directory, {
                prefix: `postTypes/${postType}`,
                template: template.templateName,
              });

          if (templatePath) {
            const component = status === 'private' && privatePath ? privatePath : templatePath;

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
                  component: path.resolve(`./${component}`),
                  path: pathname,
                  context: {
                    id,
                    databaseId,
                    status,
                    siteTitle,
                    themeOptions,
                    pagination: {
                      basePath: uri,
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
                component: path.resolve(`./${component}`),
                path: uri,
                context: {
                  id,
                  databaseId,
                  status,
                  siteTitle,
                  themeOptions,
                  pagination: {},
                  jamCMS,
                },
              });
            }
          } else {
            // Check if error was already shown
            if (!missingTemplates[templatePath]) {
              reporter.warn(
                `Template file not found. Gatsby won't create any pages for template '${template.templateName.toLowerCase()}' of post type '${postType}'.`
              );

              // Only show error message about missing template once
              missingTemplates[templatePath] = true;
            }
          }
        })
      );
    })
  );
};

export default createJamPages;
