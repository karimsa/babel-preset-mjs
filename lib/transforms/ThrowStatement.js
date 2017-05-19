/**
 * lib/transforms/ThrowStatement.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const template = require('babel-template')(`
  return throwish(ERROR)
`)

export function exit(path) {
  path.replaceWith(
    template({
      ERROR: path.node.argument
    })
  )
}