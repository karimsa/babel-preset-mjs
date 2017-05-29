'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/NewExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var template = require('babel-template')('\n  (function () {\n    let OBJECT = Object.create(CLASS.prototype)\n    return CLASS.call(OBJECT, ARGUMENTS)\n  }())\n');

function exit(path) {
  path.replaceWith(template({
    OBJECT: path.scope.generateUidIdentifier('object'),
    CLASS: path.node.callee,
    ARGUMENTS: path.node.arguments
  }));

  path.skip();
}