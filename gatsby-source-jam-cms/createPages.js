"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _getTemplatePath = _interopRequireDefault(require("./getTemplatePath"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createJamPages = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref, _ref2, _ref3) {
    var actions, reporter, graphql, settings, siteTitle, themeOptions, protectedPosts, jamCMS, directory, allNodes, privatePath, _yield$graphql, allWpContentType, _iterator, _step, contentType, postType, nodesTypeName, gatsbyNodeListFieldName, _yield$graphql2, data, missingTemplates;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            actions = _ref.actions, reporter = _ref.reporter, graphql = _ref.graphql;
            settings = _ref2.settings;
            siteTitle = _ref3.siteTitle, themeOptions = _ref3.themeOptions, protectedPosts = _ref3.protectedPosts, jamCMS = _ref3.jamCMS, directory = _ref3.directory;
            allNodes = {}; // Get path to private component

            privatePath = (0, _getTemplatePath["default"])(directory, {
              prefix: 'protected',
              template: 'private'
            });
            _context3.prev = 5;
            _context3.next = 8;
            return graphql(
            /* GraphQL */
            "\n      query ALL_CONTENT_TYPES {\n        allWpContentType {\n          nodes {\n            graphqlSingleName\n          }\n        }\n      }\n    ");

          case 8:
            _yield$graphql = _context3.sent;
            allWpContentType = _yield$graphql.data.allWpContentType;
            _iterator = _createForOfIteratorHelper(allWpContentType.nodes);
            _context3.prev = 11;

            _iterator.s();

          case 13:
            if ((_step = _iterator.n()).done) {
              _context3.next = 27;
              break;
            }

            contentType = _step.value;
            postType = contentType.graphqlSingleName; // Don't create single pages for media items

            if (!(postType === 'mediaItem')) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("continue", 25);

          case 18:
            // Capitalize post type name
            nodesTypeName = postType.charAt(0).toUpperCase() + postType.slice(1);
            gatsbyNodeListFieldName = "allWp".concat(nodesTypeName);
            _context3.next = 22;
            return graphql(
            /* GraphQL */
            "\n        query ALL_CONTENT_NODES {\n            ".concat(gatsbyNodeListFieldName, "{\n            nodes {\n              id\n              databaseId              \n              uri\n              status\n              template {\n                templateName\n              }\n            }\n          }\n        }\n      "));

          case 22:
            _yield$graphql2 = _context3.sent;
            data = _yield$graphql2.data;
            allNodes[postType] = data[gatsbyNodeListFieldName].nodes;

          case 25:
            _context3.next = 13;
            break;

          case 27:
            _context3.next = 32;
            break;

          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](11);

            _iterator.e(_context3.t0);

          case 32:
            _context3.prev = 32;

            _iterator.f();

            return _context3.finish(32);

          case 35:
            _context3.next = 40;
            break;

          case 37:
            _context3.prev = 37;
            _context3.t1 = _context3["catch"](5);

            if (_context3.t1.response && _context3.t1.response.data.message) {
              reporter.error(_context3.t1.response.data.message);
            }

          case 40:
            // Initialize missing templates object
            missingTemplates = {};
            _context3.next = 43;
            return Promise.all(Object.keys(allNodes).map( /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(postType) {
                var array;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        // Merge nodes of GraphQL query and protected posts from custom WP endpoint
                        array = protectedPosts ? allNodes[postType].concat(protectedPosts[postType]) : allNodes[postType];
                        _context2.next = 3;
                        return Promise.all(array.map( /*#__PURE__*/function () {
                          var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(node, i) {
                            var id, databaseId, uri, status, template, isArchive, archivePostType, templatePath, component, numberOfPosts, postsPerPageUsed, numberOfPages, page, pathname;
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    id = node.id, databaseId = node.databaseId, uri = node.uri, status = node.status, template = node.template;

                                    if (!(!template || !template.templateName)) {
                                      _context.next = 3;
                                      break;
                                    }

                                    return _context.abrupt("return");

                                  case 3:
                                    isArchive = template.templateName.startsWith('Archive');
                                    archivePostType = template.templateName.replace('Archive', '').toLowerCase();
                                    templatePath = isArchive ? (0, _getTemplatePath["default"])(directory, {
                                      prefix: "postTypes/".concat(archivePostType),
                                      template: 'archive'
                                    }) : (0, _getTemplatePath["default"])(directory, {
                                      prefix: "postTypes/".concat(postType),
                                      template: template.templateName
                                    });

                                    if (templatePath) {
                                      component = status === 'private' && privatePath ? privatePath : templatePath;

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
                                            component: _path["default"].resolve("./".concat(component)),
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
                                          component: _path["default"].resolve("./".concat(component)),
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
                                        reporter.warn("Template file not found. Gatsby won't create any pages for template '".concat(template.templateName.toLowerCase(), "' of post type '").concat(postType, "'.")); // Only show error message about missing template once

                                        // Only show error message about missing template once
                                        missingTemplates[templatePath] = true;
                                      }
                                    }

                                  case 7:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x5, _x6) {
                            return _ref6.apply(this, arguments);
                          };
                        }()));

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 43:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 37], [11, 29, 32, 35]]);
  }));

  return function createJamPages(_x, _x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = createJamPages;
exports["default"] = _default;