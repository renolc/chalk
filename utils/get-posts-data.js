const { readFileSync } = require('fs')

const getMds = require('./get-mds')
const md = require('./md-with-highlight')
const getHtmlContent = require ('./get-html-content')
const { mdDir } = require('./consts')

module.exports = order => {
  const data = getMds().map(fileName => {
    const body = md.render(readFileSync(`${mdDir}/${fileName}.md`, 'utf8'))
    const title = getHtmlContent(body, 'h1')
    const date = getHtmlContent(body, 'h2')
    const firstP = getHtmlContent(body, 'p')

    return {
      fileName,
      title,
      date,
      firstP,
      body
    }
  })

  order.forEach((fileName, i) => {
    const post = data.find(d => d.fileName === fileName)
    if (i > 0) post.prev = data.find(d => d.fileName === order[i-1])
    if (i < order.length - 1) post.next = data.find(d => d.fileName === order[i+1])
  })

  return data
}