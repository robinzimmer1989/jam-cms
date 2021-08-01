const React = require('react');
const JamCms = require('jam-cms').default;

const preferDefault = (m) => (m && m.default) || m;

let fields = null,
  privateTemplateExists = false;

try {
  fields = preferDefault(require(GATSBY_FIELDS_PATH));

  // loop through post types and templates and add React component to fields object
  if (fields && fields.postTypes) {
    for (const postTypeIndex in fields.postTypes) {
      const postType = fields.postTypes[postTypeIndex];

      for (const templateIndex in fields.postTypes[postTypeIndex].templates) {
        const template = fields.postTypes[postTypeIndex].templates[templateIndex];

        fields.postTypes[postTypeIndex].templates[templateIndex].component = preferDefault(
          require(`${GATSBY_TEMPLATES_PATH}/postTypes/${postType.id}/${template.id}/${template.id}`)
        );
      }
    }
  }
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    console.warn(`Couldn't find template for post type`);
  } else {
    console.warn(e);
  }
}

try {
  fields = preferDefault(require(GATSBY_FIELDS_PATH));

  // loop through taxonomies and add React component to fields object
  if (fields && fields.taxonomies) {
    for (const taxonomyIndex in fields.taxonomies) {
      const taxonomy = fields.taxonomies[taxonomyIndex];

      fields.taxonomies[taxonomyIndex].component = preferDefault(
        require(`${GATSBY_TEMPLATES_PATH}/taxonomies/${taxonomy.id}/single/single`)
      );
    }
  }
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    console.warn(`Couldn't find template for taxonomy`);
  } else {
    console.warn(e);
  }
}

try {
  const privateTemplate = preferDefault(require(`${GATSBY_TEMPLATES_PATH}/protected/private`));

  if (privateTemplate) {
    privateTemplateExists = true;
  }
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    console.warn(`Couldn't find private template`);
  } else {
    console.warn(e);
  }
}

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }, { source, settings, siteID }) => (
  <JamCms
    {...props}
    fields={fields}
    source={source}
    settings={settings}
    siteID={siteID}
    privateTemplateExists={privateTemplateExists}
  >
    {element}
  </JamCms>
);
