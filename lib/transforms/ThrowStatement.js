'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/ThrowStatement.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var template = require('babel-template')('\n  return throwish(ERROR)\n');

function exit(path) {
  path.replaceWith(template({
    ERROR: path.node.argument
  }));
}