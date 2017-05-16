/**
 * index.js - babel-preset-mjs
 * 
 * Licensed under MIT.
 * Copyright (C) 2017 Karim Alibhai.
 */

require('babel-register')

module.exports = {
  presets: [
    'es2015'
  ],

  plugins: [
    require('./lib/plugin.js').default
  ]
}