const React = require('react');
const JamCms = require('jam-cms').default;

const preferDefault = (m) => (m && m.default) || m;

let fields;

try {
  // eslint-disable-next-line
  fields = preferDefault(require(GATSBY_FIELDS_PATH));

  // loop through post types and templates and add React component to fields object
  if (fields && fields.postTypes) {
    for (const postType in fields.postTypes) {
      for (const template in fields.postTypes[postType]) {
        // eslint-disable-next-line
        const component = preferDefault(
          require(`${GATSBY_TEMPLATES_PATH}/postTypes/${postType}/${template}/${template}.js`)
        );

        fields.postTypes[postType][template].component = component;
      }
    }
  }
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    throw new Error(`Couldn't find templates`);
  } else {
    console.error(e);
    throw e;
  }
}

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }, { source, settings, siteID }) => (
  <JamCms {...props} fields={fields} source={source} settings={settings} siteID={siteID}>
    {element}
  </JamCms>
);
