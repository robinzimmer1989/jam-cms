const React = require('react');
const JamCms = require('jam-cms').default;

const preferDefault = (m) => (m && m.default) || m;

let fields;

try {
  // eslint-disable-next-line
  fields = preferDefault(require(GATSBY_FIELDS_PATH));

  // loop through post types and templates and add React component to fields object
  if (fields && fields.postTypes) {
    for (const postTypeIndex in fields.postTypes) {
      const postType = fields.postTypes[postTypeIndex];

      for (const templateIndex in fields.postTypes[postTypeIndex].templates) {
        const template = fields.postTypes[postTypeIndex].templates[templateIndex];

        // eslint-disable-next-line
        const component = preferDefault(
          require(`${GATSBY_TEMPLATES_PATH}/postTypes/${postType.id}/${template.id}/${template.id}`)
        );

        fields.postTypes[postTypeIndex].templates[templateIndex].component = component;
      }
    }
  }
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    console.warn(`Couldn't find template`);
  } else {
    console.warn(e);
  }
}

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }, { source, settings, siteID }) => (
  <JamCms {...props} fields={fields} source={source} settings={settings} siteID={siteID}>
    {element}
  </JamCms>
);
