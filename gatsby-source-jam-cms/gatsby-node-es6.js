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

var _getThemeSettings = _interopRequireDefault(require("./src/gatsby-node/getThemeSettings"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fieldsPath, templatesPath;

var onPreInit = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2) {
    var store, reporter, fields, source, apiKey, _ref2$sync, sync, fieldsObject, url;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, reporter = _ref.reporter;
            fields = _ref2.fields, source = _ref2.source, apiKey = _ref2.apiKey, _ref2$sync = _ref2.sync, sync = _ref2$sync === void 0 ? true : _ref2$sync;
            // Use default path if no fields variable is provided
            fieldsPath = fields || _path["default"].join(store.getState().program.directory, "src/fields");
            templatesPath = _path["default"].join(store.getState().program.directory, "src/templates"); // Import field object

            _context.next = 6;
            return Promise.resolve("".concat(fieldsPath)).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 6:
            fieldsObject = _context.sent;
            // Remove potential trailing slash
            url = source.replace(/\/+$/, ''); // Sync fields with backend
            // if(sync){
            // const result = await axios.post(`${url}/wp-json/jamcms/v1/syncFields?apiKey=${apiKey}`, {
            //   fields: fieldsObject,
            // });
            // if (result) {
            //   reporter.success('Synced ACF fields successfully to the jamCMS WordPress plugin');
            // }
            // }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
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
    var actions, reporter, graphql, themeOptions, allNodes, _yield$graphql, allWpContentType, _iterator, _step, contentType, postType, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql2, data, missingTemplates, _yield$graphql3, allWpTaxonomy, _iterator2, _step2, _loop, _ret;

    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            actions = _ref5.actions, reporter = _ref5.reporter, graphql = _ref5.graphql;
            _context6.next = 3;
            return (0, _getThemeSettings["default"])({
              reporter: reporter
            }, pluginOptions);

          case 3:
            themeOptions = _context6.sent;
            allNodes = {};
            _context6.prev = 5;
            _context6.next = 8;
            return graphql(
            /* GraphQL */
            "\n      query ALL_CONTENT_TYPES {\n        allWpContentType {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 8:
            _yield$graphql = _context6.sent;
            allWpContentType = _yield$graphql.data.allWpContentType;
            _iterator = _createForOfIteratorHelper(allWpContentType.nodes);
            _context6.prev = 11;

            _iterator.s();

          case 13:
            if ((_step = _iterator.n()).done) {
              _context6.next = 27;
              break;
            }

            contentType = _step.value;
            postType = contentType.graphqlSingleName; // Don't create single pages for media items

            if (!(postType === 'mediaItem')) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("continue", 25);

          case 18:
            // Capitalize post type name
            nodesTypeName = postType.charAt(0).toUpperCase() + postType.slice(1);
            gatsbyNodeListFieldName = "allWp".concat(nodesTypeName);
            _context6.next = 22;
            return graphql(
            /* GraphQL */
            "\n        query ALL_CONTENT_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              databaseId\n              id\n              uri\n              template {\n                templateName\n              }\n            }\n          }\n        }\n      "));

          case 22:
            _yield$graphql2 = _context6.sent;
            data = _yield$graphql2.data;
            allNodes[postType] = data[gatsbyNodeListFieldName].nodes;

          case 25:
            _context6.next = 13;
            break;

          case 27:
            _context6.next = 32;
            break;

          case 29:
            _context6.prev = 29;
            _context6.t0 = _context6["catch"](11);

            _iterator.e(_context6.t0);

          case 32:
            _context6.prev = 32;

            _iterator.f();

            return _context6.finish(32);

          case 35:
            _context6.next = 40;
            break;

          case 37:
            _context6.prev = 37;
            _context6.t1 = _context6["catch"](5);

            if (_context6.t1.response && _context6.t1.response.data.message) {
              reporter.error(_context6.t1.response.data.message);
            }

          case 40:
            // Initialize missing templates object
            missingTemplates = {};
            _context6.next = 43;
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
                                      templatePath = _path["default"].resolve("./src/templates/postTypes/".concat(archivePostType, "/archive/archive.js"));
                                    } else {
                                      templatePath = _path["default"].resolve("./src/templates/postTypes/".concat(postType, "/").concat(templateName.toLowerCase(), "/").concat(templateName.toLowerCase(), ".js"));
                                    }

                                    if (_fs["default"].existsSync(templatePath)) {
                                      if (isArchive) {
                                        numberOfPosts = allNodes[archivePostType].length;
                                        postsPerPageUsed = 10;

                                        if (pluginOptions.settings && pluginOptions.settings.postsPerPage) {
                                          postsPerPageUsed = pluginOptions.settings.postsPerPage;
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
                                        reporter.warn("Template file not found. Gatsby won't create any pages for ".concat(postType, "/").concat(templateName.toLowerCase())); // Only show error message about missing template once

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

          case 43:
            _context6.prev = 43;
            _context6.next = 46;
            return graphql(
            /* GraphQL */
            "\n      query ALL_TAXONOMIES {\n        allWpTaxonomy {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 46:
            _yield$graphql3 = _context6.sent;
            allWpTaxonomy = _yield$graphql3.data.allWpTaxonomy;
            _iterator2 = _createForOfIteratorHelper(allWpTaxonomy.nodes);
            _context6.prev = 49;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var taxonomy, graphqlSingleName, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql4, data;

              return _regenerator["default"].wrap(function _loop$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      taxonomy = _step2.value;
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
                                  templatePath = _path["default"].resolve("./src/templates/taxonomies/".concat(graphqlSingleName, "/single.js"));

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
                                      reporter.warn("Template file not found. Gatsby won't create any pages for taxonomy ".concat(graphqlSingleName)); // Only show error message about missing template once

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

            _iterator2.s();

          case 52:
            if ((_step2 = _iterator2.n()).done) {
              _context6.next = 59;
              break;
            }

            return _context6.delegateYield(_loop(), "t2", 54);

          case 54:
            _ret = _context6.t2;

            if (!(_ret === "continue")) {
              _context6.next = 57;
              break;
            }

            return _context6.abrupt("continue", 57);

          case 57:
            _context6.next = 52;
            break;

          case 59:
            _context6.next = 64;
            break;

          case 61:
            _context6.prev = 61;
            _context6.t3 = _context6["catch"](49);

            _iterator2.e(_context6.t3);

          case 64:
            _context6.prev = 64;

            _iterator2.f();

            return _context6.finish(64);

          case 67:
            _context6.next = 72;
            break;

          case 69:
            _context6.prev = 69;
            _context6.t4 = _context6["catch"](43);

            if (_context6.t4.response && _context6.t4.response.data.message) {
              reporter.error(_context6.t4.response.data.message);
            }

          case 72:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5, null, [[5, 37], [11, 29, 32, 35], [43, 69], [49, 61, 64, 67]]);
  }));

  return function createPages(_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createPages = createPages;