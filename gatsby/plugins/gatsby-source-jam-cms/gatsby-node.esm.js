const axios = require('axios');
const path = require('path');
const fs = require('fs');

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

    const url = `${source.replace(/\/+$/, '')}/getBuildSite?apiKey=${apiKey}`;
    const response = await axios.get(url);

    activity.end();

    const {
      data: { settings, posts },
    } = await response;

    const missingTemplates = {};

    await Promise.all(
      posts &&
        posts.map(async (o) => {
          const templatePath = path.resolve(`./src/templates/${o.postTypeID}/${o.template}.js`);

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
                globalOptions: settings,
              },
            });
          } else {
            // Only show error message about missing template once
            if (!missingTemplates[`${o.postTypeID}/${o.template}`]) {
              reporter.error(`Template ${o.postTypeID}/${o.template}.js not found`);
              missingTemplates[`${o.postTypeID}/${o.template}`] = true;
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
