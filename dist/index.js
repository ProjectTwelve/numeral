
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./numeral.cjs.production.min.js')
} else {
  module.exports = require('./numeral.cjs.development.js')
}
