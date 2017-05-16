/**
 * index.js - babel-preset-mjs
 * 
 * Licensed under MIT.
 * Copyright (C) 2017 Karim Alibhai.
 */

require('babel-register')

module.exports = {
  plugins: [
    require('./lib/plugin.js').default
  ]
}