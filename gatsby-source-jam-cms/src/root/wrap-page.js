const React = require('react');
const JamCms = require('jam-cms').default;

const casing = require('./casing').default;

const preferDefault = (m) => (m && m.default) || m;

let fields = null;
let privateTemplateExists = false;

try {
  fields = preferDefault(require(GATSBY_FIELDS_PATH));
} catch (e) {
  process.env.NODE_ENV === 'development' && console.log(`Couldn't find fields`);
}

// Loop through post types and templates and add React component to fields object
if (fields && fields.postTypes) {
  for (const postTypeIndex in fields.postTypes) {
    const postType = casing(fields.postTypes[postTypeIndex].id);

    for (const templateIndex in fields.postTypes[postTypeIndex].templates) {
      const template = fields.postTypes[postTypeIndex].templates[templateIndex].id;

      let component = null;

      // Option 1: Templates can be stored in i.e. 'src/templates/postTypes/page/default.tsx'
      try {
        component = preferDefault(
          require(`${GATSBY_TEMPLATES_PATH}/postTypes/${postType}/${template}`)
        );
      } catch (e) {
        // Don't display error message
      }

      // Option 2: Templates can be stored in i.e. 'src/templates/postTypes/page/default/default.tsx'
      if (!component) {
        try {
          component = preferDefault(
            require(`${GATSBY_TEMPLATES_PATH}/postTypes/${postType}/${template}/${template}`)
          );
        } catch (e) {
          // Now we can display an error message because both possible locations have been checked
          if (process.env.NODE_ENV === 'development') {
            if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
              console.warn(`Couldn't find template ${template} for post type ${postType}`);
            } else {
              console.warn(e);
            }
          }
        }
      }

      if (component) {
        fields.postTypes[postTypeIndex].templates[templateIndex].component = component;
      }
    }
  }
}

// Loop through taxonomies and add React component to fields object
if (fields && fields.taxonomies) {
  for (const taxonomyIndex in fields.taxonomies) {
    const taxonomy = casing(fields.taxonomies[taxonomyIndex].id);

    let component = null;

    // Option 1: Taxonomies can be stored in i.e. 'src/templates/taxonomies/category/single.tsx'
    try {
      component = preferDefault(require(`${GATSBY_TEMPLATES_PATH}/taxonomies/${taxonomy}/single`));
    } catch (e) {
      // Don't display error message
    }

    // Option 2: Taxonomies can be stored in i.e. 'src/templates/taxonomies/category/single/single.tsx'
    if (!component) {
      try {
        component = preferDefault(
          require(`${GATSBY_TEMPLATES_PATH}/taxonomies/${taxonomy}/single/single`)
        );
      } catch (e) {
        // Now we can display an error message because both possible locations have been checked
        if (process.env.NODE_ENV === 'development') {
          if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
            console.warn(`Couldn't find single template for taxonomy ${taxonomy}`);
          } else {
            console.warn(e);
          }
        }
      }
    }

    if (component) {
      fields.taxonomies[taxonomyIndex].component = component;
    }
  }
}

try {
  const privateTemplate = preferDefault(require(`${GATSBY_TEMPLATES_PATH}/protected/private`));

  if (privateTemplate) {
    privateTemplateExists = true;
  }
} catch (e) {
  if (process.env.NODE_ENV === 'development') {
    if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
      console.warn(`Couldn't find private template`);
    } else {
      console.warn(e);
    }
  }
}

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }, { source, settings }) => (
  <JamCms
    {...props}
    fields={fields}
    source={source}
    settings={settings}
    privateTemplateExists={privateTemplateExists}
  >
    {element}
  </JamCms>
);
