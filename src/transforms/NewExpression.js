/**
 * lib/transforms/NewExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const template = require('babel-template')(`
  (function () {
    let OBJECT = Object.create(CLASS.prototype)
    return CLASS.call(OBJECT, ARGUMENTS) || OBJECT
  }())
`)

export function exit(path) {
  path.replaceWith(
    template({
      OBJECT: path.scope.generateUidIdentifier('object'),
      CLASS: path.node.callee,
      ARGUMENTS: path.node.arguments
    })
  )

  path.skip()
}