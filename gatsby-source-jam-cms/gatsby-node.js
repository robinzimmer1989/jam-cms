const axios = require('axios');
const path = require('path');
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

exports.createPages = async ({ actions, reporter }, pluginOptions) => {
  const { createPage } = actions;
  const { source, apiKey } = pluginOptions;

  if (!source) {
    reporter.error('jamCMS: Source url is required');
    return;
  }

  if (!apiKey) {
    reporter.error('jamCMS: Api key is required');
    return;
  }

  let activity;

  try {
    activity = reporter.activityTimer('jamCMS: Fetching data...');
    activity.start();

    const url = `${source.replace(/\/+$/, '')}/wp-json/jamcms/v1/getBuildSite?apiKey=${apiKey}`;
    const response = await axios.get(url);

    activity.end();

    const {
      data: { globalOptions, posts },
    } = await response;

    const missingTemplates = {};

    await Promise.all(
      posts &&
        posts.map(async (o) => {
          const templatePath = path.resolve(
            `./src/templates/postTypes/${o.postTypeID}/${o.template}.js`
          );

          if (fs.existsSync(templatePath)) {
            await createPage({
              path: o.slug,
              component: templatePath,
              context: {
                id: o.id,
                seo: o.seo,
                title: o.title,
                createdAt: o.createdAt,
                featuredImage: o.featuredImage,
                postTypeID: o.postTypeID,
                content: o.content,
                globalOptions,
              },
            });
          } else {
            // Only show error message about missing template once
            if (!missingTemplates[`postTypes/${o.postTypeID}/${o.template}`]) {
              reporter.error(`Template /postTypes/${o.postTypeID}/${o.template}.js not found`);
              missingTemplates[`postTypes/${o.postTypeID}/${o.template}`] = true;
            }
          }
        })
    );
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.error(err.response.data.message);
    }
  }
};
