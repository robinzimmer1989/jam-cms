"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require('axios');

module.exports = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, pluginOptions) {
    var reporter, source, apiKey, url, response, _yield$response, _yield$response$data, siteTitle, themeOptions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reporter = _ref.reporter;
            source = pluginOptions.source, apiKey = pluginOptions.apiKey;

            if (!(!source || !apiKey)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            // Remove trailing slash
            url = source.replace(/\/+$/, '');
            _context.prev = 5;
            _context.next = 8;
            return axios.get("".concat(url, "/wp-json/jamcms/v1/getBuildSite?apiKey=").concat(apiKey));

          case 8:
            response = _context.sent;
            _context.next = 11;
            return response;

          case 11:
            _yield$response = _context.sent;
            _yield$response$data = _yield$response.data;
            siteTitle = _yield$response$data.siteTitle;
            themeOptions = _yield$response$data.themeOptions;
            return _context.abrupt("return", {
              siteTitle: siteTitle,
              themeOptions: themeOptions
            });

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](5);

            if (_context.t0.response && _context.t0.response.data.message) {
              reporter.error(_context.t0.response.data.message);
            }

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 18]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();