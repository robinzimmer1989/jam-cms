import path from 'path';
import axios from 'axios';

const syncFields = async (
  { store, reporter },
  { fields: fieldsPathPlugin, source, apiKey, settings }
) => {
  if (!apiKey) {
    reporter.panicOnBuild('jamCMS: Api key is required');
    return;
  }

  if (!source) {
    reporter.panicOnBuild('jamCMS: Source URL is required');
    return;
  }

  // Use default path if no fields variable is provided
  const fieldsPath =
    fieldsPathPlugin || path.join(store.getState().program.directory, `src/fields`);

  // Don't sync if setting is explicitly set to false, but still continue with process
  if (settings && settings.sync === false) {
    reporter.info('jamCMS: Syncing disabled');
    return;
  }

  // Import field object
  const fields = await import(fieldsPath);

  if (!fields) {
    reporter.error('jamCMS: No fields object found');
    return;
  }

  // Remove potential trailing slash
  const url = source.replace(/\/+$/, '');

  // Remove potential white space
  const sanitizedApiKey = apiKey.replace(/\s/g, '');

  // Sync fields with backend
  try {
    const result = await axios.post(
      `${url}/wp-json/jamcms/v1/syncFields?apiKey=${sanitizedApiKey}`,
      {
        fields: JSON.stringify(fields.default),
      }
    );

    if (result.data) {
      reporter.success(result.data);
    }
  } catch (err) {
    if (err?.response?.data?.code === 'rest_no_route') {
      reporter.panicOnBuild('jamCMS: Plugin not found');
    } else {
      reporter.panicOnBuild(err?.response?.data?.message);
    }
  }
};

export default syncFields;
