const axios = require('axios');

module.exports = async ({ reporter }, pluginOptions) => {
  const { source, apiKey } = pluginOptions;

  if (!source || !apiKey) {
    // We don't need to display an error message here because it was already checked in the sync function
    return;
  }

  // Remove trailing slash
  const url = source.replace(/\/+$/, '');

  // Remove potential white space
  const sanitizedApiKey = apiKey.replace(/\s/g, '');

  try {
    const response = await axios.get(
      `${url}/wp-json/jamcms/v1/getBuildSite?apiKey=${sanitizedApiKey}`
    );

    if (response && response.data) {
      return response.data;
    }
  } catch (err) {
    if (err.response && err.response.data.message) {
      reporter.panicOnBuild(err.response.data.message);
    }
  }
};
