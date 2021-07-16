import path from 'path';
import axios from 'axios';

const syncFields = async (
  { store, reporter },
  { fields: fieldsPathPlugin, source, apiKey, settings }
) => {
  if (!apiKey) {
    reporter.error('jamCMS: Api key is required');
    return true;
  }

  if (!source) {
    reporter.error('jamCMS: Source URL is required');
    return true;
  }

  // Use default path if no fields variable is provided
  const fieldsPath =
    fieldsPathPlugin || path.join(store.getState().program.directory, `src/fields`);

  // Don't sync if setting is explicitly set to false, but still continue with process
  if (settings && settings.sync === false) {
    reporter.info('jamCMS: Syncing disabled');
    return false;
  }

  // Import field object
  const fields = await import(fieldsPath);

  if (!fields) {
    reporter.error('jamCMS: No fields object found');
    return true;
  }

  // Remove potential trailing slash
  const url = source.replace(/\/+$/, '');

  // Sync fields with backend
  try {
    const result = await axios.post(`${url}/wp-json/jamcms/v1/syncFields?apiKey=${apiKey}`, {
      fields: JSON.stringify(fields.default),
    });

    if (result.data) {
      reporter.success(result.data);
      return false;
    }
  } catch (err) {
    if (err?.response?.data?.code === 'rest_no_route') {
      reporter.error('jamCMS: Plugin not found');
    } else {
      reporter.error(err?.response?.data?.message);
    }
  }

  return true;
};

export default syncFields;
