/* eslint-disable no-undef */
const _ = require('lodash')

module.exports = {
  distDir: 'dist',
  trailingSlash: true,
  env: _.pick(process.env, ['ADMIN_TOKEN']),
}
