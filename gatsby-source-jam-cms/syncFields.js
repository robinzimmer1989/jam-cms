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

var _axios = _interopRequireDefault(require("axios"));

var syncFields = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2) {
    var store, reporter, fieldsPathPlugin, source, apiKey, settings, fieldsPath, fields, url, result, _err$response, _err$response$data, _err$response2, _err$response2$data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, reporter = _ref.reporter;
            fieldsPathPlugin = _ref2.fields, source = _ref2.source, apiKey = _ref2.apiKey, settings = _ref2.settings;

            if (apiKey) {
              _context.next = 5;
              break;
            }

            reporter.error('jamCMS: Api key is required');
            return _context.abrupt("return", true);

          case 5:
            if (source) {
              _context.next = 8;
              break;
            }

            reporter.error('jamCMS: Source URL is required');
            return _context.abrupt("return", true);

          case 8:
            // Use default path if no fields variable is provided
            fieldsPath = fieldsPathPlugin || _path["default"].join(store.getState().program.directory, "src/fields"); // Don't sync if setting is explicitly set to false, but still continue with process

            if (!(settings && settings.sync === false)) {
              _context.next = 12;
              break;
            }

            reporter.info('jamCMS: Syncing disabled');
            return _context.abrupt("return", false);

          case 12:
            _context.next = 14;
            return Promise.resolve("".concat(fieldsPath)).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 14:
            fields = _context.sent;

            if (fields) {
              _context.next = 18;
              break;
            }

            reporter.error('jamCMS: No fields object found');
            return _context.abrupt("return", true);

          case 18:
            // Remove potential trailing slash
            url = source.replace(/\/+$/, ''); // Sync fields with backend

            _context.prev = 19;
            _context.next = 22;
            return _axios["default"].post("".concat(url, "/wp-json/jamcms/v1/syncFields?apiKey=").concat(apiKey), {
              fields: JSON.stringify(fields["default"])
            });

          case 22:
            result = _context.sent;

            if (!result.data) {
              _context.next = 26;
              break;
            }

            reporter.success(result.data);
            return _context.abrupt("return", false);

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](19);

            if ((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.code) === 'rest_no_route') {
              reporter.error('jamCMS: Plugin not found');
            } else {
              reporter.error(_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response2 = _context.t0.response) === null || _err$response2 === void 0 ? void 0 : (_err$response2$data = _err$response2.data) === null || _err$response2$data === void 0 ? void 0 : _err$response2$data.message);
            }

          case 31:
            return _context.abrupt("return", true);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[19, 28]]);
  }));

  return function syncFields(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = syncFields;
exports["default"] = _default;