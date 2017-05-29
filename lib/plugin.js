'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * lib/plugin.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var noop = function noop() {
  return undefined;
};

exports.default = function (_ref) {
  var types = _ref.types;

  var visitor = {},
      wrap = function wrap(fn) {
    return function (path, state) {
      return fn(path, state, types);
    };
  };

  // load all node transforms
  _fs2.default.readdirSync(_path2.default.resolve(__dirname, 'transforms')).forEach(function (name) {
    name = name.substr(0, name.length - 3);

    var currentVisitor = require('./transforms/' + name);

    // wrap visitor so that it has access to types
    if (typeof currentVisitor.default === 'function') {
      visitor[name] = wrap(currentVisitor.default);
    } else {
      visitor[name] = {
        enter: wrap(currentVisitor.enter || noop),
        exit: wrap(currentVisitor.exit || noop)
      };
    }
  });

  return { visitor: visitor };
};