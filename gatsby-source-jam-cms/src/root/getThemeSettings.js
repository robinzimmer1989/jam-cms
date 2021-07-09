const axios = require('axios');

module.exports = async ({ reporter }, pluginOptions) => {
  const { source, apiKey } = pluginOptions;

  if (!source || !apiKey) {
    return;
  }

  // Remove trailing slash
  const url = source.replace(/\/+$/, '');

  try {
    const response = await axios.get(`${url}/wp-json/jamcms/v1/getBuildSite?apiKey=${apiKey}`);

    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.error(err.response.data.message);
    }
  }
};
