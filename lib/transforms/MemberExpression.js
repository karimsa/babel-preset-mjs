'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/MemberExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

function exit(path, state, t) {
  state.console = state.console || [];

  // watch for uses of console
  if (t.isIdentifier(path.node.object) && path.node.object.name === 'console' && !path.scope.hasBinding('console')) {
    state.console.push(path.node.property.name || path.node.property.value);
  }
}