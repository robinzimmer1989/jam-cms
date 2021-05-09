"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require('axios');

module.exports = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, pluginOptions) {
    var reporter, source, apiKey, url, response, _yield$response, themeOptions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reporter = _ref.reporter;
            source = pluginOptions.source, apiKey = pluginOptions.apiKey;

            if (source) {
              _context.next = 5;
              break;
            }

            reporter.error('jamCMS: Source url is required');
            return _context.abrupt("return");

          case 5:
            if (apiKey) {
              _context.next = 8;
              break;
            }

            reporter.error('jamCMS: Api key is required');
            return _context.abrupt("return");

          case 8:
            // Remove trailing slash
            url = source.replace(/\/+$/, '');
            _context.prev = 9;
            _context.next = 12;
            return axios.get("".concat(url, "/wp-json/jamcms/v1/getBuildSite?apiKey=").concat(apiKey));

          case 12:
            response = _context.sent;
            _context.next = 15;
            return response;

          case 15:
            _yield$response = _context.sent;
            themeOptions = _yield$response.data.themeOptions;
            return _context.abrupt("return", themeOptions);

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](9);

            if (_context.t0.response && _context.t0.response.data.message) {
              reporter.error(_context.t0.response.data.message);
            }

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 20]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();