import path from 'path';
import fs from 'fs';

import syncFields from './syncFields';
import getThemeSettings from './getThemeSettings';
import addPathToFields from './addPathToFields';
import createJamPages from './createPages';
import createJamTaxonomies from './createTaxonomies';

let args = { fields: null, templatePath: '', hasError: false };

let directory = [];

function getDirectory(dir) {
  fs.readdirSync(dir).forEach((f) => {
    const relativePath = path.join(dir, f);
    if (fs.statSync(relativePath).isDirectory()) {
      return getDirectory(relativePath);
    } else {
      return directory.push(relativePath);
    }
  });
}

getDirectory('./src/templates');

export const onPreInit = async (gatsby, pluginOptions) => {
  const hasError = await syncFields(gatsby, pluginOptions, directory);

  if (hasError) {
    args = { hasError };
  } else {
    const fields = await addPathToFields(gatsby, pluginOptions, directory);

    args = {
      fields,
      templatePath: path.join(gatsby.store.getState().program.directory, `src/templates`),
      hasError: false,
    };
  }
};

export const onCreateWebpackConfig = ({ actions, plugins }) => {
  // Make template path and fields variable globally available so we can import the templates in the wrap-page.js (gatsby-browser only)
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_FIELDS: JSON.stringify(args.fields),
        GATSBY_TEMPLATE_PATH: JSON.stringify(args.templatePath),
      }),
    ],
  });
};

export const createPages = async (gatsby, pluginOptions) => {
  if (args.hasError) {
    return;
  }

  const { siteTitle, themeOptions, protectedPosts } = await getThemeSettings(gatsby, pluginOptions);

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
    jamCMS,
    directory,
  });

  await createJamTaxonomies(gatsby, pluginOptions, {
    siteTitle,
    themeOptions,
    jamCMS,
    directory,
  });
};
