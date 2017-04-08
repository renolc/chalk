const { writeFileSync } = require('fs')

const readOrder = require('./read-order')
const { orderPath } = require('./consts')

module.exports = (fileName) => writeFileSync(orderPath, JSON.stringify(readOrder().concat(fileName)))