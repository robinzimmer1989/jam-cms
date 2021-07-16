"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getTemplatePath = function getTemplatePath(directory, _ref) {
  var prefix = _ref.prefix,
      template = _ref.template;
  var templatePath = directory.find(function (s) {
    return s.includes(prefix) && s.includes("".concat(template.toLowerCase(), "."));
  });
  return templatePath;
};

var _default = getTemplatePath;
exports["default"] = _default;