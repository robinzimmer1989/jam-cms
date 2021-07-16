"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _getTemplatePath = _interopRequireDefault(require("./getTemplatePath"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createJamTaxonomies = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref, _ref2, _ref3) {
    var actions, reporter, graphql, siteTitle, themeOptions, jamCMS, directory, _yield$graphql, allWpTaxonomy, _iterator, _step, _loop, _ret;

    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            actions = _ref.actions, reporter = _ref.reporter, graphql = _ref.graphql;
            (0, _objectDestructuringEmpty2["default"])(_ref2);
            siteTitle = _ref3.siteTitle, themeOptions = _ref3.themeOptions, jamCMS = _ref3.jamCMS, directory = _ref3.directory;
            _context3.prev = 3;
            _context3.next = 6;
            return graphql(
            /* GraphQL */
            "\n      query ALL_TAXONOMIES {\n        allWpTaxonomy {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 6:
            _yield$graphql = _context3.sent;
            allWpTaxonomy = _yield$graphql.data.allWpTaxonomy;
            _iterator = _createForOfIteratorHelper(allWpTaxonomy.nodes);
            _context3.prev = 9;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var taxonomy, graphqlSingleName, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql2, data;

              return _regenerator["default"].wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      taxonomy = _step.value;
                      graphqlSingleName = taxonomy.graphqlSingleName; // Don't create single pages for post format

                      if (!(graphqlSingleName === 'postFormat')) {
                        _context2.next = 4;
                        break;
                      }

                      return _context2.abrupt("return", "continue");

                    case 4:
                      // Capitalize post type name
                      nodesTypeName = graphqlSingleName.charAt(0).toUpperCase() + graphqlSingleName.slice(1);
                      gatsbyNodeListFieldName = "allWp".concat(nodesTypeName);
                      _context2.next = 8;
                      return graphql(
                      /* GraphQL */
                      "\n        query ALL_TERM_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              id\n              databaseId\n              slug\n              uri\n              status\n            }\n          }\n        }\n      "));

                    case 8:
                      _yield$graphql2 = _context2.sent;
                      data = _yield$graphql2.data;
                      _context2.next = 12;
                      return Promise.all(data[gatsbyNodeListFieldName].nodes.map( /*#__PURE__*/function () {
                        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(node, i) {
                          var templatePath, id, databaseId, uri, slug;
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  templatePath = (0, _getTemplatePath["default"])(directory, {
                                    prefix: "taxonomies/".concat(graphqlSingleName),
                                    template: 'single'
                                  });

                                  if (templatePath) {
                                    id = node.id, databaseId = node.databaseId, uri = node.uri, slug = node.slug;
                                    actions.createPage({
                                      component: _path["default"].resolve("./".concat(templatePath)),
                                      path: uri,
                                      context: {
                                        id: id,
                                        databaseId: databaseId,
                                        siteTitle: siteTitle,
                                        slug: slug,
                                        themeOptions: themeOptions,
                                        jamCMS: jamCMS
                                      }
                                    });
                                  } else {
                                    // Check if error was already shown
                                    if (!missingTemplates[templatePath]) {
                                      reporter.warn("Template file not found. Gatsby won't create any pages for taxonomy '".concat(graphqlSingleName, "'.")); // Only show error message about missing template once

                                      // Only show error message about missing template once
                                      missingTemplates[templatePath] = true;
                                    }
                                  }

                                case 2:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x4, _x5) {
                          return _ref5.apply(this, arguments);
                        };
                      }()));

                    case 12:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop);
            });

            _iterator.s();

          case 12:
            if ((_step = _iterator.n()).done) {
              _context3.next = 19;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 14);

          case 14:
            _ret = _context3.t0;

            if (!(_ret === "continue")) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("continue", 17);

          case 17:
            _context3.next = 12;
            break;

          case 19:
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t1 = _context3["catch"](9);

            _iterator.e(_context3.t1);

          case 24:
            _context3.prev = 24;

            _iterator.f();

            return _context3.finish(24);

          case 27:
            _context3.next = 32;
            break;

          case 29:
            _context3.prev = 29;
            _context3.t2 = _context3["catch"](3);

            if (_context3.t2.response && _context3.t2.response.data.message) {
              reporter.error(_context3.t2.response.data.message);
            }

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, null, [[3, 29], [9, 21, 24, 27]]);
  }));

  return function createJamTaxonomies(_x, _x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = createJamTaxonomies;
exports["default"] = _default;