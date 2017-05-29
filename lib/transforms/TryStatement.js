'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exit;
/**
 * lib/transforms/TryStatement.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var template = require('babel-template'),
    wrapTry = template('\n        // this only works as long as your\n        // return isn\'t \'return;\' but actually\n        // returns a value (or null)\n\n        let TMP = TRY_CATCH_FINALLY\n        if (TMP !== undefined) return TMP\n      '),
    tryCatch = template('\n        tryish(() => {\n          TRY_BLOCK\n        }, ERROR => {\n          CATCH_BLOCK\n        })\n      '),
    tryFinally = template('\n        tryish(() => {\n          TRY_BLOCK\n        }, null, () => {\n          FINALLY_BLOCK\n        })\n      '),
    tryCatchFinally = template('\n        tryish(() => {\n          TRY_BLOCK\n        }, ERROR => {\n          CATCH_BLOCK\n        }, () => {\n          FINALLY_BLOCK\n        })\n      ');

function exit(path, state) {
  state.tryUsed = true;

  // select proper template
  var tpl = tryCatch;

  if (path.node.finalizer) {
    tpl = path.node.handler ? tryCatchFinally : tryFinally;
  }

  // to avoid errors below
  var handler = path.node.handler || {},
      finalizer = path.node.finalizer || {};

  // replace with template wrapped for return
  path.replaceWithMultiple(wrapTry({
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
  }));
}