"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = exports.onCreateWebpackConfig = exports.onPreInit = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

var _getThemeSettings = _interopRequireDefault(require("./getThemeSettings"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fieldsPath, templatesPath;

var onPreInit = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2) {
    var store, reporter, fields, source, apiKey, _ref2$sync, sync, fieldsObject, url, result, _err$response, _err$response$data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, reporter = _ref.reporter;
            fields = _ref2.fields, source = _ref2.source, apiKey = _ref2.apiKey, _ref2$sync = _ref2.sync, sync = _ref2$sync === void 0 ? true : _ref2$sync;

            if (apiKey) {
              _context.next = 5;
              break;
            }

            reporter.error('jamCMS: Api key is required');
            return _context.abrupt("return");

          case 5:
            if (source) {
              _context.next = 8;
              break;
            }

            reporter.error('jamCMS: Source URL is required');
            return _context.abrupt("return");

          case 8:
            // Use default path if no fields variable is provided
            fieldsPath = fields || _path["default"].join(store.getState().program.directory, "src/fields");
            templatesPath = _path["default"].join(store.getState().program.directory, "src/templates"); // Import field object

            _context.next = 12;
            return Promise.resolve("".concat(fieldsPath)).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 12:
            fieldsObject = _context.sent;
            // Remove potential trailing slash
            url = source.replace(/\/+$/, ''); // Sync fields with backend

            if (!(sync && fieldsObject)) {
              _context.next = 25;
              break;
            }

            _context.prev = 15;
            _context.next = 18;
            return _axios["default"].post("".concat(url, "/wp-json/jamcms/v1/syncFields?apiKey=").concat(apiKey), {
              fields: JSON.stringify(fieldsObject["default"])
            });

          case 18:
            result = _context.sent;

            if (result.data) {
              reporter.success(result.data);
            }

            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](15);
            reporter.error(_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.message);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 22]]);
  }));

  return function onPreInit(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.onPreInit = onPreInit;

var onCreateWebpackConfig = function onCreateWebpackConfig(_ref4) {
  var actions = _ref4.actions,
      plugins = _ref4.plugins;
  // Make field path variable globally available so we can import the templates in the wrap-page.js file (gatsby-browser only)
  actions.setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_FIELDS_PATH: JSON.stringify(fieldsPath),
      GATSBY_TEMPLATES_PATH: JSON.stringify(templatesPath)
    })]
  });
};

exports.onCreateWebpackConfig = onCreateWebpackConfig;

var createPages = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5, pluginOptions) {
    var store, actions, reporter, graphql, settings, fields, fieldsObject, themeOptions, allNodes, _yield$graphql, allWpContentType, _iterator, _step, contentType, postType, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql2, data, missingTemplates, allowedExtensions, getPath, _yield$graphql3, allWpTaxonomy, _iterator3, _step3, _loop, _ret;

    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            store = _ref5.store, actions = _ref5.actions, reporter = _ref5.reporter, graphql = _ref5.graphql;
            settings = pluginOptions.settings, fields = pluginOptions.fields; // Use default path if no fields variable is provided

            fieldsPath = fields || _path["default"].join(store.getState().program.directory, "src/fields"); // Import field object

            _context6.next = 5;
            return Promise.resolve("".concat(fieldsPath)).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 5:
            fieldsObject = _context6.sent;
            _context6.next = 8;
            return (0, _getThemeSettings["default"])({
              reporter: reporter
            }, pluginOptions);

          case 8:
            themeOptions = _context6.sent;
            allNodes = {};
            _context6.prev = 10;
            _context6.next = 13;
            return graphql(
            /* GraphQL */
            "\n      query ALL_CONTENT_TYPES {\n        allWpContentType {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 13:
            _yield$graphql = _context6.sent;
            allWpContentType = _yield$graphql.data.allWpContentType;
            _iterator = _createForOfIteratorHelper(allWpContentType.nodes);
            _context6.prev = 16;

            _iterator.s();

          case 18:
            if ((_step = _iterator.n()).done) {
              _context6.next = 32;
              break;
            }

            contentType = _step.value;
            postType = contentType.graphqlSingleName; // Don't create single pages for media items

            if (!(postType === 'mediaItem')) {
              _context6.next = 23;
              break;
            }

            return _context6.abrupt("continue", 30);

          case 23:
            // Capitalize post type name
            nodesTypeName = postType.charAt(0).toUpperCase() + postType.slice(1);
            gatsbyNodeListFieldName = "allWp".concat(nodesTypeName);
            _context6.next = 27;
            return graphql(
            /* GraphQL */
            "\n        query ALL_CONTENT_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              databaseId\n              id\n              uri\n              template {\n                templateName\n              }\n            }\n          }\n        }\n      "));

          case 27:
            _yield$graphql2 = _context6.sent;
            data = _yield$graphql2.data;
            allNodes[postType] = data[gatsbyNodeListFieldName].nodes;

          case 30:
            _context6.next = 18;
            break;

          case 32:
            _context6.next = 37;
            break;

          case 34:
            _context6.prev = 34;
            _context6.t0 = _context6["catch"](16);

            _iterator.e(_context6.t0);

          case 37:
            _context6.prev = 37;

            _iterator.f();

            return _context6.finish(37);

          case 40:
            _context6.next = 45;
            break;

          case 42:
            _context6.prev = 42;
            _context6.t1 = _context6["catch"](10);

            if (_context6.t1.response && _context6.t1.response.data.message) {
              reporter.error(_context6.t1.response.data.message);
            }

          case 45:
            // Initialize missing templates object
            missingTemplates = {};
            allowedExtensions = ['.js', '.jsx', '.tsx'];

            getPath = function getPath(type, postType, templateName) {
              var thePath;

              var _iterator2 = _createForOfIteratorHelper(allowedExtensions),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var extension = _step2.value;

                  var templatePath = _path["default"].resolve("./src/templates/".concat(type, "/").concat(postType, "/").concat(templateName.toLowerCase(), "/").concat(templateName.toLowerCase()).concat(extension));

                  if (_fs["default"].existsSync(templatePath)) {
                    thePath = templatePath;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              return thePath;
            };

            _context6.next = 50;
            return Promise.all(Object.keys(allNodes).map( /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(postType) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return Promise.all(allNodes[postType].map( /*#__PURE__*/function () {
                          var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(node, i) {
                            var id, uri, templateName, isArchive, archivePostType, templatePath, numberOfPosts, postsPerPageUsed, numberOfPages, page, pathname;
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    id = node.id, uri = node.uri, templateName = node.template.templateName;
                                    isArchive = templateName.includes('Archive ');
                                    archivePostType = templateName.replace('Archive ', '').toLowerCase();

                                    if (isArchive) {
                                      templatePath = getPath('postTypes', archivePostType, 'archive');
                                    } else {
                                      templatePath = getPath('postTypes', postType, templateName);
                                    }

                                    if (_fs["default"].existsSync(templatePath)) {
                                      if (isArchive) {
                                        numberOfPosts = allNodes[archivePostType].length;
                                        postsPerPageUsed = 10;

                                        if (settings && settings.postsPerPage) {
                                          postsPerPageUsed = settings.postsPerPage;
                                        }

                                        numberOfPages = Math.ceil(numberOfPosts / postsPerPageUsed);

                                        for (page = 1; page <= numberOfPages; page++) {
                                          pathname = uri;

                                          if (page > 1) {
                                            pathname = "".concat(uri, "page/").concat(page);
                                          }

                                          actions.createPage({
                                            component: templatePath,
                                            path: pathname,
                                            context: {
                                              id: id,
                                              themeOptions: themeOptions,
                                              pagination: {
                                                basePath: uri,
                                                numberOfPosts: numberOfPosts,
                                                postsPerPage: postsPerPageUsed,
                                                numberOfPages: Math.ceil(numberOfPosts / postsPerPageUsed),
                                                page: page
                                              }
                                            }
                                          });
                                        }
                                      } else {
                                        actions.createPage({
                                          component: templatePath,
                                          path: uri,
                                          context: {
                                            id: id,
                                            themeOptions: themeOptions,
                                            pagination: {}
                                          }
                                        });
                                      }
                                    } else {
                                      // Check if error was already shown
                                      if (!missingTemplates[templatePath]) {
                                        reporter.warn("Template file not found. Gatsby won't create any pages for template '".concat(templateName.toLowerCase(), "' of post type '").concat(postType, "'. Add a template file to ").concat(templatePath)); // Only show error message about missing template once

                                        // Only show error message about missing template once
                                        missingTemplates[templatePath] = true;
                                      }
                                    }

                                  case 5:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x6, _x7) {
                            return _ref8.apply(this, arguments);
                          };
                        }()));

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 50:
            _context6.prev = 50;
            _context6.next = 53;
            return graphql(
            /* GraphQL */
            "\n      query ALL_TAXONOMIES {\n        allWpTaxonomy {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 53:
            _yield$graphql3 = _context6.sent;
            allWpTaxonomy = _yield$graphql3.data.allWpTaxonomy;
            _iterator3 = _createForOfIteratorHelper(allWpTaxonomy.nodes);
            _context6.prev = 56;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var taxonomy, graphqlSingleName, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql4, data;

              return _regenerator["default"].wrap(function _loop$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      taxonomy = _step3.value;
                      graphqlSingleName = taxonomy.graphqlSingleName; // Don't create single pages for media items

                      if (!(graphqlSingleName === 'postFormat')) {
                        _context5.next = 4;
                        break;
                      }

                      return _context5.abrupt("return", "continue");

                    case 4:
                      // Capitalize post type name
                      nodesTypeName = graphqlSingleName.charAt(0).toUpperCase() + graphqlSingleName.slice(1);
                      gatsbyNodeListFieldName = "allWp".concat(nodesTypeName);
                      _context5.next = 8;
                      return graphql(
                      /* GraphQL */
                      "\n        query ALL_TERM_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              id\n              slug\n              uri\n            }\n          }\n        }\n      "));

                    case 8:
                      _yield$graphql4 = _context5.sent;
                      data = _yield$graphql4.data;
                      _context5.next = 12;
                      return Promise.all(data[gatsbyNodeListFieldName].nodes.map( /*#__PURE__*/function () {
                        var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(node, i) {
                          var templatePath, uri, slug, id;
                          return _regenerator["default"].wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  templatePath = getPath('taxonomies', graphqlSingleName, 'single');

                                  if (_fs["default"].existsSync(templatePath)) {
                                    uri = node.uri, slug = node.slug, id = node.id;
                                    actions.createPage({
                                      component: templatePath,
                                      path: uri,
                                      context: {
                                        id: id,
                                        slug: slug,
                                        themeOptions: themeOptions
                                      }
                                    });
                                  } else {
                                    // Check if error was already shown
                                    if (!missingTemplates[templatePath]) {
                                      reporter.warn("Template file not found. Gatsby won't create any pages for taxonomy '".concat(graphqlSingleName, "'. Add a template file to ").concat(templatePath)); // Only show error message about missing template once

                                      // Only show error message about missing template once
                                      missingTemplates[templatePath] = true;
                                    }
                                  }

                                case 2:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          }, _callee4);
                        }));

                        return function (_x8, _x9) {
                          return _ref9.apply(this, arguments);
                        };
                      }()));

                    case 12:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _loop);
            });

            _iterator3.s();

          case 59:
            if ((_step3 = _iterator3.n()).done) {
              _context6.next = 66;
              break;
            }

            return _context6.delegateYield(_loop(), "t2", 61);

          case 61:
            _ret = _context6.t2;

            if (!(_ret === "continue")) {
              _context6.next = 64;
              break;
            }

            return _context6.abrupt("continue", 64);

          case 64:
            _context6.next = 59;
            break;

          case 66:
            _context6.next = 71;
            break;

          case 68:
            _context6.prev = 68;
            _context6.t3 = _context6["catch"](56);

            _iterator3.e(_context6.t3);

          case 71:
            _context6.prev = 71;

            _iterator3.f();

            return _context6.finish(71);

          case 74:
            _context6.next = 79;
            break;

          case 76:
            _context6.prev = 76;
            _context6.t4 = _context6["catch"](50);

            if (_context6.t4.response && _context6.t4.response.data.message) {
              reporter.error(_context6.t4.response.data.message);
            }

          case 79:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5, null, [[10, 42], [16, 34, 37, 40], [50, 76], [56, 68, 71, 74]]);
  }));

  return function createPages(_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createPages = createPages;