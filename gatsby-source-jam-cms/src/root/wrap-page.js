const React = require('react');
const JamCms = require('jam-cms').default;

const preferDefault = (m) => (m && m.default) || m;

let fields;

try {
  // eslint-disable-next-line
  fields = GATSBY_FIELDS;

  // loop through post types and templates and add React component to fields object
  if (fields && fields.postTypes) {
    for (const postTypeIndex in fields.postTypes) {
      for (const templateIndex in fields.postTypes[postTypeIndex].templates) {
        const template = fields.postTypes[postTypeIndex].templates[templateIndex];

        fields.postTypes[postTypeIndex].templates[templateIndex].component = preferDefault(
          require(`${GATSBY_TEMPLATE_PATH}${template.componentPath}`)
        );
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
