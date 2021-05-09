const axios = require('axios');

module.exports = async ({ reporter }, pluginOptions) => {
  const { source, apiKey } = pluginOptions;

  if (!source) {
    reporter.error('jamCMS: Source url is required');
    return;
  }

  if (!apiKey) {
    reporter.error('jamCMS: Api key is required');
    return;
  }

  // Remove trailing slash
  const url = source.replace(/\/+$/, '');

  try {
    const response = await axios.get(`${url}/wp-json/jamcms/v1/getBuildSite?apiKey=${apiKey}`);

    const {
      data: { themeOptions },
    } = await response;

    return themeOptions;
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.error(err.response.data.message);
    }
  }
};
