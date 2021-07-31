import path from 'path';
import fs from 'fs';

import syncFields from './syncFields';
import getThemeSettings from './getThemeSettings';
import createJamPages from './createPages';
import createJamTaxonomies from './createTaxonomies';

let hasError = false,
  fieldsPath = '',
  templatesPath = '';

let directory = [];

function getDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((f) => {
      const relativePath = path.join(dir, f);
      if (fs.statSync(relativePath).isDirectory()) {
        return getDirectory(relativePath);
      } else {
        return directory.push(relativePath);
      }
    });
  }
}

getDirectory('./src/templates');

export const onPreInit = async (gatsby, pluginOptions) => {
  hasError = await syncFields(gatsby, pluginOptions);

  templatesPath = path.join(gatsby.store.getState().program.directory, `src/templates`);
  fieldsPath =
    pluginOptions.fields || path.join(gatsby.store.getState().program.directory, `src/fields`);
};

export const onCreateWebpackConfig = ({ actions, plugins }) => {
  // Make template path and fields path variable globally available so we can import the templates in the wrap-page.js (gatsby-browser)
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_FIELDS_PATH: JSON.stringify(fieldsPath),
        GATSBY_TEMPLATES_PATH: JSON.stringify(templatesPath),
      }),
    ],
  });
};

export const createPages = async (gatsby, pluginOptions) => {
  if (hasError) {
    return;
  }

  const { siteTitle, themeOptions, protectedPosts, activePlugins } = await getThemeSettings(
    gatsby,
    pluginOptions
  );

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

  await createJamPages(gatsby, pluginOptions, {
    siteTitle,
    themeOptions,
    protectedPosts,
    activePlugins,
    jamCMS,
    directory,
  });

  await createJamTaxonomies(gatsby, pluginOptions, {
    siteTitle,
    themeOptions,
    activePlugins,
    jamCMS,
    directory,
  });
};
