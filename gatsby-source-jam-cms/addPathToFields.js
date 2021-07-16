"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _getTemplatePath = _interopRequireDefault(require("./getTemplatePath"));

var addPathToFields = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2, directory) {
    var store, fields, fieldsPath, fieldsObject, postTypeIndex, postType, templateIndex, template, templatePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store;
            fields = _ref2.fields;
            // Use default path if no fields variable is provided
            fieldsPath = fields || _path["default"].join(store.getState().program.directory, "src/fields"); // Import field object

            _context.next = 5;
            return Promise.resolve("".concat(fieldsPath)).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 5:
            fieldsObject = _context.sent;

            if (fieldsObject) {
              fieldsObject = fieldsObject["default"]; // We need to add the relative path to the component here because doing this in the wrap-page.js component doesn't work as expected.
              // For some reason it needs to be relative though. Passing in the entire (absolute) path leads to a component no found error.

              for (postTypeIndex in fieldsObject.postTypes) {
                postType = fieldsObject.postTypes[postTypeIndex];

                for (templateIndex in fieldsObject.postTypes[postTypeIndex].templates) {
                  template = fieldsObject.postTypes[postTypeIndex].templates[templateIndex]; // Generate path link based in directory entries

                  templatePath = (0, _getTemplatePath["default"])(directory, {
                    prefix: "postTypes/".concat(postType.id),
                    template: template.id
                  }); // Remove file extension from filename

                  templatePath = templatePath.split('.').slice(0, -1).join('.'); // 'src/templates' is already assigned in the global template path variable, so we can delete it here.

                  templatePath = templatePath.replace('src/templates', ''); // Add new componentPath property which we can use in wrap-page.js

                  if (templatePath) {
                    fieldsObject.postTypes[postTypeIndex].templates[templateIndex].componentPath = templatePath;
                  }
                }
              }
            }

            return _context.abrupt("return", fieldsObject);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addPathToFields(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = addPathToFields;
exports["default"] = _default;