/**
 * lib/transforms/VariableDeclaration.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

export function exit(path, _, t) {
  // only 'let' is supported by mjs
  path.node.kind = 'let'
}