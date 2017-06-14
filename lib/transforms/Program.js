'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
/**
 * lib/transforms/Program.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

var createPolyfill = function createPolyfill(polyfills, dependencies, vars) {
  return require('babel-template')('\n  ' + dependencies.map(function (dep) {
    return 'load(\'' + dep + '\')';
  }).join(';') + ';\n\n  ' + polyfills.join(';') + '\n')(vars);
};

// console polyfill: push all console methods to
// print()
var consolePolyfill = '\n  const console = {}\n\n  ;CONSOLE_METHODS.map(method => {\n    console[method] = function (msg) {\n      // TODO: use util.format() to process msg\n      print(`[${method.toUpperCase()}] ${msg}`)\n    }\n  })\n';

// try/catch/finally polyfill: manually handle all blocks
// through sync functions
var tryCatchFinallyPolyfill = '\n  // ensure error is being thrown\n  const throwish = error => (error instanceof Error ? error : new Error(error))\n\n  // act as a try/catch/finally\n  const tryish = (tryBlock, catchBlock, finallyBlock) => {\n    let tryReturn = tryBlock()\n\n    // noopify\n    catchBlock = catchBlock || (() => undefined)\n    finallyBlock = finallyBlock || (() => undefined)\n\n    // run catch then finally, give priority to\n    // the return in finally\n    if (tryReturn instanceof Error) {\n      let catchReturn = catchBlock()\n        , finallyReturn = finallyBlock()\n      return finallyReturn === undefined ? catchReturn : finallyReturn\n    }\n\n    // if no error, return whatever finally returns\n    // otherwise just return what the try block returned\n    let finallyReturn = finallyBlock()\n    return finallyReturn === undefined ? tryReturn : finallyReturn\n  }\n';

// loose equals polyfill: determines equality using
// the table at:
// https://developer.mozilla.org/en/docs/Web/JavaScript/Equality_comparisons_and_sameness
var looseEqualsPolyfill = '\n  const looseEquals = (a, b) => {\n    const types = [a, b].map(c => {\n      if (c === undefined || c === null) return \'nil\'\n      return typeof c\n    })\n\n    // nil-types are considered the same\n    if (types[0] === \'nil\' && types[1] === \'nil\') return true\n\n    // if only one is nil, it\'s not equal\n    if (types[0] === \'nil\' || types[1] === \'nil\') return false\n\n    // if type is the same, no coersion needed\n    if (types[0] === types[1]) return a === b\n\n    // if one of the two is an object, turn it into\n    // a primitive\n    if (types[0] === \'object\') {\n      if (a === a.valueOf()) return false\n      return equal(a.valueOf(), b)\n    } else if (types[1] === \'object\') {\n      if (b === b.valueOf()) return false\n      return equal(a, b.valueOf())\n    }\n\n    // if one of the two is a number, coerce the\n    // other one into a number\n    if (types[0] === \'boolean\' || types[0] === \'string\' || types[1] === \'number\') a = +a\n    if (types[1] === \'boolean\' || types[1] === \'string\' || types[1] === \'number\') b = +b\n\n    return a === b\n  }\n';

// function constructor polyfill: makes it work with eval
var functionPolyfill = '\n  const Function = function () {\n    var args = [].slice.call(arguments)\n      , body = args[args.length - 1]\n    \n    args = args.slice(0, args.length - 1)\n\n    return eval(\'(function (\' + args.join(\', \') + \') { \' + body + \' })\')\n  }\n';

// timers polyfill: add global timer functions using api_timer.js
var setTimeoutPolyfill = '\n  const setTimeout = (fn, timeout) => {\n    Timer.set(timeout, false, fn, null)\n  }\n',
    setIntervalPolyfill = '\n  const setInterval = (fn, timeout) => {\n    Timer.set(timeout, true, fn, null)\n  }\n';

function exit(path, state, t) {
  state.console = state.console || [];

  // grab list of global variables
  var globals = Object.keys(path.scope.globals);

  // list of polyfills to include
  var polyfills = [];

  // add console polyfill, if console was used
  if (state.console.length > 0) {
    polyfills.push(consolePolyfill);
  }

  // add try/catch/finally polyfill if used
  if (state.tryUsed === true) {
    polyfills.push(tryCatchFinallyPolyfill);
  }

  // add loose equals polyfill, if needed
  if (state.looseEquals === true) {
    polyfills.push(looseEqualsPolyfill);
  }

  // add function constructor polyfill
  if (globals.indexOf('Function') !== -1) {
    polyfills.push(functionPolyfill);
  }

  // add timers polyfill
  if (globals.indexOf('setTimeout') !== -1) {
    polyfills.push(setTimeoutPolyfill);
  }

  if (globals.indexOf('setInterval') !== -1) {
    polyfills.push(setIntervalPolyfill);
  }

  // compile all
  if (polyfills.length > 0) {
    path.unshiftContainer('body', createPolyfill(polyfills, [globals.indexOf('setTimeout') !== -1 || globals.indexOf('setInterval') !== -1 ? 'api_timer.js' : null].filter(Boolean), {
      CONSOLE_METHODS: t.arrayExpression(state.console.filter(function (m, i, s) {
        return s.indexOf(m) === i;
      }).map(function (method) {
        return t.stringLiteral(method);
      }))
    }));
  }
}