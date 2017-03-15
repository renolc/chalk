const { writeFileSync } = require('fs')
const { touch, echo, open } = require('cmd-executor')

const appendToOrder = require('../utils/append-to-order')
const { mdDir } = require('../utils/consts')

module.exports = async (...name) => {
  const fileName = `${name.map((i) => i.replace(/\W/g, '').toLowerCase()).join('-')}.md`
  const filePath = `${mdDir}/${fileName}`

  appendToOrder(fileName)

  await touch(filePath)
  await echo(`"# ${name.join(' ')}"`, '>', filePath)
  await echo(`"## ${new Date().toDateString()}"`, '>>', filePath)
  await open(filePath)
}