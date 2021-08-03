import path from 'path';

// import functions
import syncFields from './syncFields';
import getThemeSettings from './getThemeSettings';
import pages from './createPages';
import terms from './createTerms';

let fieldsPath = '',
  templatesPath = '';

export const onPreInit = async (gatsby, pluginOptions) => {
  // Sync post types, templates and fields to WordPress
  await syncFields(gatsby, pluginOptions);

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
  const { siteTitle, themeOptions, protectedPosts, activePlugins, languages } =
    await getThemeSettings(gatsby, pluginOptions);

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

  await pages(gatsby, pluginOptions, {
    siteTitle,
    themeOptions,
    protectedPosts,
    activePlugins,
    languages,
    jamCMS,
  });

  await terms(gatsby, pluginOptions, {
    siteTitle,
    themeOptions,
    activePlugins,
    languages,
    jamCMS,
  });
};
