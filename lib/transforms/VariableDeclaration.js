'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/VariableDeclaration.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

function exit(path, _, t) {
  // only 'let' is supported by mjs
  path.node.kind = 'let';
}