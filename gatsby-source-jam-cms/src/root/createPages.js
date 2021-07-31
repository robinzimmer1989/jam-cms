import path from 'path';

import getTemplatePath from './getTemplatePath';

const createJamPages = async (
  { actions, reporter, graphql },
  {},
  { siteTitle, themeOptions, protectedPosts, activePlugins, jamCMS, directory }
) => {
  const allNodes = {};

  // Get path to private component
  const privatePath = getTemplatePath(directory, { prefix: 'protected', template: 'private' });

  const defaultLanguageFragment = activePlugins.includes('polylang')
    ? `
      defaultLanguage {
        id
        locale
        name
        slug
      }
    `
    : ``;

  try {
    // Get all post types
    const {
      data: { allWpContentType, wp },
    } = await graphql(/* GraphQL */ `
      query ALL_CONTENT_TYPES {
        wp {
          generalSettings {
            title
          }
          ${defaultLanguageFragment}
        }
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

      const seoFragment = activePlugins.includes('yoast')
        ? `
          seo {
            title
            metaDesc
            metaRobotsNoindex
            opengraphImage {
              sourceUrl
            }
            fullHead
          }
          `
        : ``;

      const languageFragment = activePlugins.includes('polylang')
        ? `
          language {
            slug
            name
            locale
          }
          translations {
            title
            uri
            language {
              slug
              name
              locale
            }
          }
          `
        : ``;

      // Assign archive query parameters to page
      const archiveFragment =
        nodesTypeName === 'Page'
          ? `
            archive
            archivePostType
            archivePostsPerPage
          `
          : ``;

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
              ${archiveFragment}
              ${seoFragment}
              ${languageFragment}
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
          let {
            id,
            databaseId,
            uri,
            status,
            template,
            archive,
            archivePostType,
            archivePostsPerPage,
          } = node;

          if (!template || !template.templateName) {
            return;
          }

          const context = {
            id,
            databaseId,
            status,
            siteTitle,
            themeOptions,
            jamCMS,
            pagination: {},
          };

          if (activePlugins.includes('yoast')) {
            context.seo = node.seo;
          }

          if (activePlugins.includes('polylang')) {
            context.language = node.language;
            context.translations = node.translations;
          }

          const templatePath = archive
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

            if (archive && archivePostType) {
              const numberOfPosts = allNodes[archivePostType].length;

              const numberOfPages = Math.ceil(numberOfPosts / archivePostsPerPage);

              for (let page = 1; page <= numberOfPages; page++) {
                let pathname = uri;

                if (page > 1) {
                  pathname = `${uri}page/${page}`;
                }

                context.pagination = {
                  basePath: uri,
                  numberOfPosts,
                  postsPerPage: archivePostsPerPage,
                  numberOfPages: Math.ceil(numberOfPosts / archivePostsPerPage),
                  page,
                };

                actions.createPage({
                  component: path.resolve(`./${component}`),
                  path: pathname,
                  context,
                });
              }
            } else {
              actions.createPage({
                component: path.resolve(`./${component}`),
                path: uri,
                context,
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
