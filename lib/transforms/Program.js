/**
 * lib/transforms/Program.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const consolePolyfill = require('babel-template')(`
  (function (global) {
    global.console = global.console || {}

    ;METHODS.map(method => {
      global.console[method] = function (msg) {
        // TODO: use util.format() to process msg
        print(\`[\${method.toUpperCase()}] \${msg}\`)
      }
    })
  }(glob.global || glob.window || this))
`)

export function exit(path, state, t) {
  // add console polyfill, if console was used
  if (state.console instanceof Array && state.console.length > 0) {
    path.unshiftContainer('body', consolePolyfill({
      METHODS: t.arrayExpression(state.console.map(method => t.stringLiteral(method)))
    }))
  }
}