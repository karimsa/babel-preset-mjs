'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/FunctionExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var template = require('babel-template')('\n  (function () {\n    let CLASS_NAME = CONSTRUCTOR\n\n    CLASS_NAME.prototype = {}\n\n    return CLASS_NAME\n  }())\n');

function exit(path, state, t) {
  path.replaceWith(template({
    CLASS_NAME: path.scope.generateUidIdentifier('class'),
    CONSTRUCTOR: path.node
  }));

  // mark as visited
  path.skip();
}