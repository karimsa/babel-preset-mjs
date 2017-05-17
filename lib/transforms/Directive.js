/**
 * lib/transforms/Directive.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

export default function (path, _, t) {
  // remove 'use strict' directive since mjs is always
  // in strict mode
  if (path.node.value.value === 'use strict') {
    path.remove()
  }
}