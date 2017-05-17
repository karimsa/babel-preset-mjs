# babel-preset-mjs

Babel preset to transpile JS to restricted
[mjs](https://github.com/cesanta/mjs) JS.

## Features

| Restriction | Solution |
| ----------- | -------- |
| No String, Number, RegExp, Date, Function, etc. | **Not solved** |
| No try/catch/finally. | Transpiled to functions that make try/catch/finally work. |
| No error classes. | **Not solved** |
| No `new` or prototypes. In order to create an object with a custom prototype, use **`Object.create()`**, which is available. | `new` is handled by `Object.create()`, and the constructor is called on the resultant object |
| Strict mode only. No `for..of`, `=>`, destructors, generators, proxies, promises, classes, template strings. | Handled by `babel-preset-es2015` (included by default). |
| No `var`, only `let`. | All uses of `var` are changed to `let`. |
| No getters, setters, `valueOf`. | **Not solved** |
| No `==` or `!=`, only `===` and `!==`. | All uses of `==` are transpiled to a manually evaluated loose equals.  |
| `load()` is used to load external JS, not very standardized and pollutes the global scope. | **Not solved** |
| No support for asynchronous behavior. All code is blocking. | **Not solved** |

## Usage

`.babelrc`:

```json
{
  "presets": [
    "mjs"
  ]
}
```

## License

Licensed under [MIT](LICENSED.md) license.

Copyright (C) 2017 Karim Alibhai.