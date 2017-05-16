/**
 * lib/transforms/MemberExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

export default function(path, state, t) {
  state.console = state.console || []

  // watch for uses of console
  if (t.isIdentifier(path.node.object) && path.node.object.name === 'console' && !path.scope.hasBinding('console')) {
    state.console.push(path.node.property.name || path.node.property.value)
  }
}