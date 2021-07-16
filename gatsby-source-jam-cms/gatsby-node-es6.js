"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = exports.onCreateWebpackConfig = exports.onPreInit = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _syncFields = _interopRequireDefault(require("./syncFields"));

var _getThemeSettings = _interopRequireDefault(require("./getThemeSettings"));

var _addPathToFields = _interopRequireDefault(require("./addPathToFields"));

var _createPages = _interopRequireDefault(require("./createPages"));

var _createTaxonomies = _interopRequireDefault(require("./createTaxonomies"));

var args = {
  fields: null,
  templatePath: '',
  hasError: false
};
var directory = [];

function getDirectory(dir) {
  _fs["default"].readdirSync(dir).forEach(function (f) {
    var relativePath = _path["default"].join(dir, f);

    if (_fs["default"].statSync(relativePath).isDirectory()) {
      return getDirectory(relativePath);
    } else {
      return directory.push(relativePath);
    }
  });
}

getDirectory('./src/templates');

var onPreInit = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gatsby, pluginOptions) {
    var hasError, fields;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _syncFields["default"])(gatsby, pluginOptions, directory);

          case 2:
            hasError = _context.sent;

            if (!hasError) {
              _context.next = 7;
              break;
            }

            args = {
              hasError: hasError
            };
            _context.next = 11;
            break;

          case 7:
            _context.next = 9;
            return (0, _addPathToFields["default"])(gatsby, pluginOptions, directory);

          case 9:
            fields = _context.sent;
            args = {
              fields: fields,
              templatePath: _path["default"].join(gatsby.store.getState().program.directory, "src/templates"),
              hasError: false
            };

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function onPreInit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.onPreInit = onPreInit;

var onCreateWebpackConfig = function onCreateWebpackConfig(_ref2) {
  var actions = _ref2.actions,
      plugins = _ref2.plugins;
  // Make template path and fields variable globally available so we can import the templates in the wrap-page.js (gatsby-browser only)
  actions.setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_FIELDS: JSON.stringify(args.fields),
      GATSBY_TEMPLATE_PATH: JSON.stringify(args.templatePath)
    })]
  });
};

exports.onCreateWebpackConfig = onCreateWebpackConfig;

var createPages = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(gatsby, pluginOptions) {
    var _yield$getThemeSettin, siteTitle, themeOptions, protectedPosts, jamCMS;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!args.hasError) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            _context2.next = 4;
            return (0, _getThemeSettings["default"])(gatsby, pluginOptions);

          case 4:
            _yield$getThemeSettin = _context2.sent;
            siteTitle = _yield$getThemeSettin.siteTitle;
            themeOptions = _yield$getThemeSettin.themeOptions;
            protectedPosts = _yield$getThemeSettin.protectedPosts;
            // Prepare jamCMS object with default values for page context
            jamCMS = {
              sidebar: {
                active: false,
                width: 320,
                position: 'left',
                defaultOpen: false,
                style: 'inline'
              }
            };
            _context2.next = 11;
            return (0, _createPages["default"])(gatsby, pluginOptions, {
              siteTitle: siteTitle,
              themeOptions: themeOptions,
              protectedPosts: protectedPosts,
              jamCMS: jamCMS,
              directory: directory
            });

          case 11:
            _context2.next = 13;
            return (0, _createTaxonomies["default"])(gatsby, pluginOptions, {
              siteTitle: siteTitle,
              themeOptions: themeOptions,
              jamCMS: jamCMS,
              directory: directory
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createPages(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createPages = createPages;