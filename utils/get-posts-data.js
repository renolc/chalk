const { readFileSync } = require('fs')

const md = require('./md-with-highlight')
const readOrder = require('./read-order')
const getHtmlContent = require ('./get-html-content')
const { mdDir } = require('./consts')

module.exports = () => readOrder().map((mdFile, i) => {
  const body = md.render(readFileSync(`${mdDir}/${mdFile}`, 'utf8'))
  const title = getHtmlContent(body, 'h1')
  const date = getHtmlContent(body, 'h2')
  const firstP = getHtmlContent(body, 'p')

  return {
    fileName: mdFile.split('.')[0],
    title,
    date,
    firstP,
    body
  }
})