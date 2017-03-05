const { writeFileSync } = require('fs')

const { orderPath } = require('./consts')

module.exports = (data) => writeFileSync(orderPath, JSON.stringify(data))