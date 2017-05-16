/**
 * lib/transforms/TryStatement.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const template = require('babel-template')
    , wrapTry = template(`
        // this only works as long as your
        // return isn't 'return;' but actually
        // returns a value (or null)

        let TMP = TRY_CATCH_FINALLY
        if (TMP !== undefined) return TMP
      `)
    , tryCatch = template(`
        tryish(() => {
          TRY_BLOCK
        }, ERROR => {
          CATCH_BLOCK
        })
      `)
    , tryFinally = template(`
        tryish(() => {
          TRY_BLOCK
        }, null, () => {
          FINALLY_BLOCK
        })
      `)
    , tryCatchFinally = template(`
        tryish(() => {
          TRY_BLOCK
        }, ERROR => {
          CATCH_BLOCK
        }, () => {
          FINALLY_BLOCK
        })
      `)

export default function (path, state) {
  state.tryUsed = true

  // select proper template
  let tpl = tryCatch

  if (path.node.finalizer) {
    tpl = path.node.handler ? tryCatchFinally : tryFinally
  }

  // to avoid errors below
  const handler = path.node.handler || {}
      , finalizer = path.node.finalizer || {}

  // replace with template wrapped for return
  path.replaceWithMultiple(
    wrapTry({
      TMP: path.scope.generateUidIdentifier('returnValue'),

      TRY_CATCH_FINALLY: tpl({
        // try
        TRY_BLOCK: path.node.block,

        // catch
        ERROR: handler.param,
        CATCH_BLOCK: handler.body,

        // finally
        FINALLY_BLOCK: finalizer
      })
    })
  )
}