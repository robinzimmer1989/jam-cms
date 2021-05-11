"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require('react');

var JamCms = require('jam-cms')["default"];

var preferDefault = function preferDefault(m) {
  return m && m["default"] || m;
};

var fields;

try {
  // eslint-disable-next-line
  fields = preferDefault(require(GATSBY_FIELDS_PATH)); // loop through post types and templates and add React component to fields object

  if (fields && fields.postTypes) {
    for (var postTypeIndex in fields.postTypes) {
      var postType = fields.postTypes[postTypeIndex];

      for (var templateIndex in fields.postTypes[postTypeIndex].templates) {
        var template = fields.postTypes[postTypeIndex].templates[templateIndex]; // eslint-disable-next-line

        var component = preferDefault(require("".concat(GATSBY_TEMPLATES_PATH, "/postTypes/").concat(postType.id, "/").concat(template.id, "/").concat(template.id, ".js")));
        fields.postTypes[postTypeIndex].templates[templateIndex].component = component;
      }
    }
  }
} catch (e) {
  if (e.toString().indexOf("Error: Cannot find module") !== -1) {
    throw new Error("Couldn't find templates");
  } else {
    console.error(e);
    throw e;
  }
} // eslint-disable-next-line react/prop-types,react/display-name


module.exports = function (_ref, _ref2) {
  var element = _ref.element,
      props = _ref.props;
  var source = _ref2.source,
      settings = _ref2.settings,
      siteID = _ref2.siteID;
  return /*#__PURE__*/React.createElement(JamCms, (0, _extends2["default"])({}, props, {
    fields: fields,
    source: source,
    settings: settings,
    siteID: siteID
  }), element);
};