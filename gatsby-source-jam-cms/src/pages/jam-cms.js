"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jamCms = require("jam-cms");

var _templateObject, _templateObject2;

var Login = function Login(props) {
  var source = props.source;
  return /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(CardWrapper, null, /*#__PURE__*/_react["default"].createElement(_jamCms.LoginForm, {
    url: source
  })));
};

var Container = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 40px 0;\n  background: #f0f2f5;\n"])));

var CardWrapper = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 400px;\n  width: 100%;\n  padding: 40px 0;\n"])));

var _default = Login;
exports["default"] = _default;