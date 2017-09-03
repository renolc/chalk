const writeHtmlFile = require('./write-html-file')
const insertHtmlData = require('./insert-html-data')
const {
  postsDir,
  postTemplatePath,
  prevTemplatePath,
  nextTemplatePath
} = require('./consts')

module.exports = (posts) => posts.forEach(post => {
  writeHtmlFile(`${postsDir}/${post.fileName}.html`, postTemplatePath, {
    title: post.title,
    body: post.body,
    prev: post.prev ? insertHtmlData(prevTemplatePath, { url: `/posts/${post.prev.fileName}`, text: post.prev.title }) : '',
    next: post.next ? insertHtmlData(nextTemplatePath, { url: `/posts/${post.next.fileName}`, text: post.next.title }) : ''
  })
})