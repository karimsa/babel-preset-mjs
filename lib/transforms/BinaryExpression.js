/**
 * lib/transforms/BinaryExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

const template = require('babel-template')
    , equal = template(`
        looseEquals(OPERAND_A, OPERAND_B)
      `)
    , notEqual = template(`
        looseEquals(OPERAND_A, OPERAND_B)
      `)

export function exit(path, state) {
  if (['==', '!='].indexOf(path.node.operator) !== -1) {
    state.looseEquals = true
  }

  // mjs only supports '===' and '!=='
  if (path.node.operator === '==') {
    path.replaceWith(
      equal({
        OPERAND_A: path.node.left,
        OPERAND_B: path.node.right
      })
    )
  } else if (path.node.operator === '!=') {
    path.replaceWith(
      notEqual({
        OPERAND_A: path.node.left,
        OPERAND_B: path.node.right
      })
    )
  }
}