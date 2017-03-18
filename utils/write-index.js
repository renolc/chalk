const insertHtmlData = require('./insert-html-data')
const writeHtmlFile = require('./write-html-file')
const {
  indexTemplatePath,
  itemTemplatePath,
  prevTemplatePath,
  nextTemplatePath,
  pageDir
} = require('./consts')

const postsPerPage = 5

module.exports = (posts) => {
  const items = posts.map((post, i) => insertHtmlData(itemTemplatePath, {
    fileName: post.fileName,
    title: post.title,
    date: post.date,
    firstP: post.firstP
  })).reverse()

  const numPages = Math.ceil(items.length / postsPerPage)
  for (let i = 0; i < numPages; i++) {
    const start = i * postsPerPage
    const pageItems = items.slice(start, start + postsPerPage).join('\n')
    const pageNum = i + 1
    const path = (i === 0) ? './index.html' : `${pageDir}/${pageNum}.html`
    writeHtmlFile(path, indexTemplatePath, {
      items: pageItems,
      prev: (pageNum < numPages) ? insertHtmlData(prevTemplatePath, { url: `/page/${pageNum+1}`, text: 'Older' }) : '',
      next: (pageNum > 1) ? insertHtmlData(nextTemplatePath, { url: (pageNum === 2) ? '../' : `/page/${i}`, text: 'Newer' }) : ''
    })
  }
}