/**
 * lib/transforms/Program.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const polyfills = []
    , createPolyfill = vars => require('babel-template')(`
        (function (global) {
          ${polyfills.join(';')}
        }(this.global || this.window || this))
      `)(vars)

// console polyfill: push all console methods to
// print()
const consolePolyfill = `
  global.console = global.console || {}

  ;CONSOLE_METHODS.map(method => {
    global.console[method] = function (msg) {
      // TODO: use util.format() to process msg
      print(\`[\${method.toUpperCase()}] \${msg}\`)
    }
  })
`

// try/catch/finally polyfill: manually handle all blocks
// through sync functions
const tryCatchFinallyPolyfill = `
  // ensure error is being thrown
  global.throwish = error => (error instanceof Error ? error : new Error(error))

  // act as a try/catch/finally
  global.tryish = (tryBlock, catchBlock, finallyBlock) => {
    let tryReturn = tryBlock()

    // noopify
    catchBlock = catchBlock || (() => undefined)
    finallyBlock = finallyBlock || (() => undefined)

    // run catch then finally, give priority to
    // the return in finally
    if (tryReturn instanceof Error) {
      let catchReturn = catchBlock()
        , finallyReturn = finallyBlock()
      return finallyReturn === undefined ? catchReturn : finallyReturn
    }

    // if no error, return whatever finally returns
    // otherwise just return what the try block returned
    let finallyReturn = finallyBlock()
    return finallyReturn === undefined ? tryReturn : finallyReturn
  }
`

export function exit(path, state, t) {
  state.console = state.console || []

  // add console polyfill, if console was used
  if (state.console.length > 0) {
    polyfills.push(consolePolyfill)
  }

  // add try/catch/finally polyfill if used
  if (state.tryUsed === true) {
    polyfills.push(tryCatchFinallyPolyfill)
  }

  // compile all
  if (polyfills.length > 0) {
    path.unshiftContainer('body', createPolyfill({
      CONSOLE_METHODS: t.arrayExpression(state.console.map(method => t.stringLiteral(method)))
    }))
  }
}