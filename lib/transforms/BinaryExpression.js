/**
 * lib/transforms/BinaryExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

export default function (path) {
  // mjs only supports '===' and '!=='
  if (path.node.operator === '==') {
    path.node.operator = '==='
  } else if (path.node.operator === '!=') {
    path.node.operator = '!=='
  }
}