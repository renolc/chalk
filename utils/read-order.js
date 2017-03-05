const { readFileSync } = require('fs')

const { orderPath } = require('./consts')

module.exports = () => JSON.parse(readFileSync(orderPath, 'utf8'))