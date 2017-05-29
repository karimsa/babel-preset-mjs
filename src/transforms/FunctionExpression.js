/**
 * lib/transforms/FunctionExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const template = require('babel-template')(`
  (function () {
    let CLASS_NAME = CONSTRUCTOR

    CLASS_NAME.prototype = {}

    return CLASS_NAME
  }())
`)

export function exit(path, state, t) {
  path.replaceWith(template({
    CLASS_NAME: path.scope.generateUidIdentifier('class'),
    CONSTRUCTOR: path.node
  }))

  // mark as visited
  path.skip()
}