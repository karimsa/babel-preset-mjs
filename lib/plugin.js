/**
 * lib/plugin.js - babel-preset-mjs
 * 
 * Licensed under MIT license.
 * Copyright (C) 2017 Karim Alibhai.
 */

import fs from 'fs'
import path from 'path'

const noop = () => undefined

export default ({ types }) => {
  const visitor = {}
      , wrap = fn => {
        return (path, state) => {
          return fn(path, state, types)
        }
      }

  // load all node transforms
  fs.readdirSync(path.resolve(__dirname, 'transforms')).forEach(name => {
    name = name.substr(0, name.length - 3)

    const currentVisitor = require(`./transforms/${name}`)

    // wrap visitor so that it has access to types
    if (typeof currentVisitor.default === 'function') {
      visitor[name] = wrap(currentVisitor.default)
    }

    else {
      visitor[name] = {
        enter: wrap(currentVisitor.enter || noop),
        exit: wrap(currentVisitor.exit || noop)
      }
    }
  })

  return { visitor }
}