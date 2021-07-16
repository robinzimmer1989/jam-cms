import path from 'path';

import getTemplatePath from './getTemplatePath';

const addPathToFields = async ({ store }, { fields }, directory) => {
  // Use default path if no fields variable is provided
  const fieldsPath = fields || path.join(store.getState().program.directory, `src/fields`);

  // Import field object
  let fieldsObject = await import(fieldsPath);

  if (fieldsObject) {
    fieldsObject = fieldsObject.default;

    // We need to add the relative path to the component here because doing this in the wrap-page.js component doesn't work as expected.
    // For some reason it needs to be relative though. Passing in the entire (absolute) path leads to a component no found error.
    for (const postTypeIndex in fieldsObject.postTypes) {
      const postType = fieldsObject.postTypes[postTypeIndex];

      for (const templateIndex in fieldsObject.postTypes[postTypeIndex].templates) {
        const template = fieldsObject.postTypes[postTypeIndex].templates[templateIndex];

        // Generate path link based in directory entries
        let templatePath = getTemplatePath(directory, {
          prefix: `postTypes/${postType.id}`,
          template: template.id,
        });

        // Remove file extension from filename
        templatePath = templatePath.split('.').slice(0, -1).join('.');

        // 'src/templates' is already assigned in the global template path variable, so we can delete it here.
        templatePath = templatePath.replace('src/templates', '');

        // Add new componentPath property which we can use in wrap-page.js
        if (templatePath) {
          fieldsObject.postTypes[postTypeIndex].templates[
            templateIndex
          ].componentPath = templatePath;
        }
      }
    }
  }

  return fieldsObject;
};

export default addPathToFields;
