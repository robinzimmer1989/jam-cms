const React = require('react');
const JamCms = require('jam-cms').default;

const preferDefault = (m) => (m && m.default) || m;
let templates, globalOptions;

try {
  // eslint-disable-next-line
  templates = preferDefault(require(GATSBY_TEMPLATES_PATH));
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    throw new Error(`Couldn't find templates`);
  } else {
    console.error(e);
    throw e;
  }
}

try {
  // eslint-disable-next-line
  globalOptions = preferDefault(require(GATSBY_GLOBAL_OPTIONS_PATH));
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    globalOptions = [];
  } else {
    console.error(e);
    throw e;
  }
}

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }, { source, settings }) => (
  <JamCms
    {...props}
    templates={templates}
    globalOptions={globalOptions}
    source={source}
    settings={settings}
  >
    {element}
  </JamCms>
);
