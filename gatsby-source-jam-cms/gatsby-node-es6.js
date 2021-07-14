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

var fieldsPath,
    templatesPath,
    hasError = false;

var onPreInit = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2) {
    var store, reporter, fields, source, apiKey, settings, fieldsObject, url, result, _err$response, _err$response$data, _err$response2, _err$response2$data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, reporter = _ref.reporter;
            fields = _ref2.fields, source = _ref2.source, apiKey = _ref2.apiKey, settings = _ref2.settings;

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
            // import templates
            templatesPath = _path["default"].join(store.getState().program.directory, "src/templates"); // Use default path if no fields variable is provided

            fieldsPath = fields || _path["default"].join(store.getState().program.directory, "src/fields"); // Don't sync if setting is explicitly set to false

            if (!(settings && settings.sync === false)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", reporter.info('jamCMS: Syncing disabled'));

          case 12:
            _context.next = 14;
            return Promise.resolve("".concat(fieldsPath)).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 14:
            fieldsObject = _context.sent;

            if (fieldsObject) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", reporter.error('jamCMS: No fields object found'));

          case 17:
            // Remove potential trailing slash
            url = source.replace(/\/+$/, ''); // Sync fields with backend

            _context.prev = 18;
            _context.next = 21;
            return _axios["default"].post("".concat(url, "/wp-json/jamcms/v1/syncFields?apiKey=").concat(apiKey), {
              fields: JSON.stringify(fieldsObject["default"])
            });

          case 21:
            result = _context.sent;

            if (result.data) {
              reporter.success(result.data);
            }

            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](18);
            hasError = true;

            if ((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.code) === 'rest_no_route') {
              reporter.error('jamCMS: Plugin not found');
            } else {
              reporter.error(_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$response2 = _context.t0.response) === null || _err$response2 === void 0 ? void 0 : (_err$response2$data = _err$response2.data) === null || _err$response2$data === void 0 ? void 0 : _err$response2$data.message);
            }

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[18, 25]]);
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
    var store, actions, reporter, graphql, settings, fields, jamCMS, _yield$getThemeSettin, siteTitle, themeOptions, protectedPosts, allNodes, _yield$graphql, allWpContentType, _iterator, _step, contentType, postType, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql2, data, missingTemplates, allowedExtensions, getPath, _yield$graphql3, allWpTaxonomy, _iterator3, _step3, _loop, _ret;

    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            store = _ref5.store, actions = _ref5.actions, reporter = _ref5.reporter, graphql = _ref5.graphql;

            if (!hasError) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return");

          case 3:
            settings = pluginOptions.settings, fields = pluginOptions.fields; // Prepare jamCMS object with default values for page context

            jamCMS = {
              sidebar: {
                active: false,
                width: 320,
                position: 'left',
                defaultOpen: false,
                style: 'inline'
              }
            }; // Use default path if no fields variable is provided

            fieldsPath = fields || _path["default"].join(store.getState().program.directory, "src/fields");
            _context6.next = 8;
            return (0, _getThemeSettings["default"])({
              reporter: reporter
            }, pluginOptions);

          case 8:
            _yield$getThemeSettin = _context6.sent;
            siteTitle = _yield$getThemeSettin.siteTitle;
            themeOptions = _yield$getThemeSettin.themeOptions;
            protectedPosts = _yield$getThemeSettin.protectedPosts;
            allNodes = {};
            _context6.prev = 13;
            _context6.next = 16;
            return graphql(
            /* GraphQL */
            "\n      query ALL_CONTENT_TYPES {\n        allWpContentType {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 16:
            _yield$graphql = _context6.sent;
            allWpContentType = _yield$graphql.data.allWpContentType;
            _iterator = _createForOfIteratorHelper(allWpContentType.nodes);
            _context6.prev = 19;

            _iterator.s();

          case 21:
            if ((_step = _iterator.n()).done) {
              _context6.next = 35;
              break;
            }

            contentType = _step.value;
            postType = contentType.graphqlSingleName; // Don't create single pages for media items

            if (!(postType === 'mediaItem')) {
              _context6.next = 26;
              break;
            }

            return _context6.abrupt("continue", 33);

          case 26:
            // Capitalize post type name
            nodesTypeName = postType.charAt(0).toUpperCase() + postType.slice(1);
            gatsbyNodeListFieldName = "allWp".concat(nodesTypeName);
            _context6.next = 30;
            return graphql(
            /* GraphQL */
            "\n        query ALL_CONTENT_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              id\n              databaseId              \n              uri\n              status\n              template {\n                templateName\n              }\n            }\n          }\n        }\n      "));

          case 30:
            _yield$graphql2 = _context6.sent;
            data = _yield$graphql2.data;
            allNodes[postType] = data[gatsbyNodeListFieldName].nodes;

          case 33:
            _context6.next = 21;
            break;

          case 35:
            _context6.next = 40;
            break;

          case 37:
            _context6.prev = 37;
            _context6.t0 = _context6["catch"](19);

            _iterator.e(_context6.t0);

          case 40:
            _context6.prev = 40;

            _iterator.f();

            return _context6.finish(40);

          case 43:
            _context6.next = 48;
            break;

          case 45:
            _context6.prev = 45;
            _context6.t1 = _context6["catch"](13);

            if (_context6.t1.response && _context6.t1.response.data.message) {
              reporter.error(_context6.t1.response.data.message);
            }

          case 48:
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

                  // TODO: Path can be changed via gatsby-config option
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

            _context6.next = 53;
            return Promise.all(Object.keys(allNodes).map( /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(postType) {
                var array;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        // Merge nodes of GraphQL query and protected posts from custom WP endpoint
                        array = protectedPosts ? allNodes[postType].concat(protectedPosts[postType]) : allNodes[postType];
                        _context3.next = 3;
                        return Promise.all(array.map( /*#__PURE__*/function () {
                          var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(node, i) {
                            var id, databaseId, uri, status, template, isArchive, archivePostType, templatePath, renderPrivate, privatePath, numberOfPosts, postsPerPageUsed, numberOfPages, page, pathname;
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    id = node.id, databaseId = node.databaseId, uri = node.uri, status = node.status, template = node.template;

                                    if (!(!template || !template.templateName)) {
                                      _context2.next = 3;
                                      break;
                                    }

                                    return _context2.abrupt("return");

                                  case 3:
                                    isArchive = template.templateName.startsWith('Archive');
                                    archivePostType = template.templateName.replace('Archive', '').toLowerCase();

                                    if (isArchive) {
                                      templatePath = getPath('postTypes', archivePostType, 'archive');
                                    } else {
                                      templatePath = getPath('postTypes', postType, template.templateName);
                                    } // Check if component for private path exists


                                    // Check if component for private path exists
                                    renderPrivate = false;
                                    privatePath = _path["default"].resolve("./src/templates/private.js");

                                    if (status === 'private' && _fs["default"].existsSync(privatePath)) {
                                      renderPrivate = true;
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
                                            component: renderPrivate ? privatePath : templatePath,
                                            path: pathname,
                                            context: {
                                              id: id,
                                              databaseId: databaseId,
                                              status: status,
                                              siteTitle: siteTitle,
                                              themeOptions: themeOptions,
                                              pagination: {
                                                basePath: uri,
                                                numberOfPosts: numberOfPosts,
                                                postsPerPage: postsPerPageUsed,
                                                numberOfPages: Math.ceil(numberOfPosts / postsPerPageUsed),
                                                page: page
                                              },
                                              jamCMS: jamCMS
                                            }
                                          });
                                        }
                                      } else {
                                        actions.createPage({
                                          component: renderPrivate ? privatePath : templatePath,
                                          path: uri,
                                          context: {
                                            id: id,
                                            databaseId: databaseId,
                                            status: status,
                                            siteTitle: siteTitle,
                                            themeOptions: themeOptions,
                                            pagination: {},
                                            jamCMS: jamCMS
                                          }
                                        });
                                      }
                                    } else {
                                      // Check if error was already shown
                                      if (!missingTemplates[templatePath]) {
                                        reporter.warn("Template file not found. Gatsby won't create any pages for template '".concat(template.templateName.toLowerCase(), "' of post type '").concat(postType, "'. Add a template file to ").concat(templatePath)); // Only show error message about missing template once

                                        // Only show error message about missing template once
                                        missingTemplates[templatePath] = true;
                                      }
                                    }

                                  case 10:
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

                      case 3:
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

          case 53:
            _context6.prev = 53;
            _context6.next = 56;
            return graphql(
            /* GraphQL */
            "\n      query ALL_TAXONOMIES {\n        allWpTaxonomy {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 56:
            _yield$graphql3 = _context6.sent;
            allWpTaxonomy = _yield$graphql3.data.allWpTaxonomy;
            _iterator3 = _createForOfIteratorHelper(allWpTaxonomy.nodes);
            _context6.prev = 59;
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
                      "\n        query ALL_TERM_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              id\n              databaseId\n              slug\n              uri\n              status\n            }\n          }\n        }\n      "));

                    case 8:
                      _yield$graphql4 = _context5.sent;
                      data = _yield$graphql4.data;
                      _context5.next = 12;
                      return Promise.all(data[gatsbyNodeListFieldName].nodes.map( /*#__PURE__*/function () {
                        var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(node, i) {
                          var templatePath, id, databaseId, uri, slug;
                          return _regenerator["default"].wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  templatePath = getPath('taxonomies', graphqlSingleName, 'single');

                                  if (_fs["default"].existsSync(templatePath)) {
                                    id = node.id, databaseId = node.databaseId, uri = node.uri, slug = node.slug;
                                    actions.createPage({
                                      component: templatePath,
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

          case 62:
            if ((_step3 = _iterator3.n()).done) {
              _context6.next = 69;
              break;
            }

            return _context6.delegateYield(_loop(), "t2", 64);

          case 64:
            _ret = _context6.t2;

            if (!(_ret === "continue")) {
              _context6.next = 67;
              break;
            }

            return _context6.abrupt("continue", 67);

          case 67:
            _context6.next = 62;
            break;

          case 69:
            _context6.next = 74;
            break;

          case 71:
            _context6.prev = 71;
            _context6.t3 = _context6["catch"](59);

            _iterator3.e(_context6.t3);

          case 74:
            _context6.prev = 74;

            _iterator3.f();

            return _context6.finish(74);

          case 77:
            _context6.next = 82;
            break;

          case 79:
            _context6.prev = 79;
            _context6.t4 = _context6["catch"](53);

            if (_context6.t4.response && _context6.t4.response.data.message) {
              reporter.error(_context6.t4.response.data.message);
            }

          case 82:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5, null, [[13, 45], [19, 37, 40, 43], [53, 79], [59, 71, 74, 77]]);
  }));

  return function createPages(_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createPages = createPages;