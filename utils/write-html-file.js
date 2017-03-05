const { writeFileSync } = require('fs')

const insertHtmlData = require('./insert-html-data')

module.exports = (fileName, templatePath, data) => {
  writeFileSync(fileName, insertHtmlData(templatePath, data))
}