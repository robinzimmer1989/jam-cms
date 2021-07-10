"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require('axios');

module.exports = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, pluginOptions) {
    var reporter, source, apiKey, url, response;
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

            if (!(response && response.data)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", response.data);

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);

            if (_context.t0.response && _context.t0.response.data.message) {
              reporter.error(_context.t0.response.data.message);
            }

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 13]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();