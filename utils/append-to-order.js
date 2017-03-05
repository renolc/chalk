const readOrder = require('./read-order')
const writeOrder = require('./write-order')

module.exports = (fileName) => writeOrder(readOrder().concat(fileName))