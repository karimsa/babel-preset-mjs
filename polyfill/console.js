(function (global) {
  global.console = global.console || {}

  ;[
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ].forEach(method => {
    global.console[method] = function (msg) {
      // TODO: use util.format() to process msg
      print(`[${method.toUpperCase()}] ${msg}`)
    }
  })
}(this))