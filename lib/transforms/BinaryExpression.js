'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/BinaryExpression.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var template = require('babel-template'),
    equal = template('\n        looseEquals(OPERAND_A, OPERAND_B)\n      '),
    notEqual = template('\n        looseEquals(OPERAND_A, OPERAND_B)\n      ');

function exit(path, state) {
  if (['==', '!='].indexOf(path.node.operator) !== -1) {
    state.looseEquals = true;
  }

  // mjs only supports '===' and '!=='
  if (path.node.operator === '==') {
    path.replaceWith(equal({
      OPERAND_A: path.node.left,
      OPERAND_B: path.node.right
    }));
  } else if (path.node.operator === '!=') {
    path.replaceWith(notEqual({
      OPERAND_A: path.node.left,
      OPERAND_B: path.node.right
    }));
  }
}