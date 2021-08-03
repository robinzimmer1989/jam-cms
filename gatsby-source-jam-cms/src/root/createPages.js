import path from 'path';

// import app components
import getTemplatePath from './getTemplatePath';
import fragments from './fragments';

const createJamPages = async (
  { actions, reporter, graphql },
  {},
  { siteTitle, themeOptions, protectedPosts, activePlugins, languages, jamCMS, directory }
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

      // Prepare fragments
      const archiveFragment = nodesTypeName === 'Page' ? fragments.archive : '';

      const seoFragment = activePlugins.includes('yoast') ? fragments.seo : '';

      const languageFragment =
        activePlugins.includes('polylang') && languages?.postTypes?.includes(postType)
          ? fragments.languagePage
          : '';

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
        array.map(async (node) => {
          if (!node || !node.template || !node.template.templateName) {
            return;
          }

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

          if (activePlugins.includes('polylang') && languages?.postTypes?.includes(postType)) {
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
              // In case the node has a language assigned we wanna filter the posts accordingly
              const filteredPosts = allNodes[archivePostType].filter((o) =>
                node?.language ? o.language === node?.language : o
              );

              const numberOfPosts = filteredPosts.length;

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
