const writeHtmlFile = require('./write-html-file')
const insertHtmlData = require('./insert-html-data')
const {
  postsDir,
  postTemplatePath,
  prevTemplatePath,
  nextTemplatePath
} = require('./consts')

module.exports = (posts) => posts.forEach((post, i) => {
  writeHtmlFile(`${postsDir}/${post.fileName}.html`, postTemplatePath, {
    title: post.title,
    body: post.body,
    prev: posts[i-1] ? insertHtmlData(prevTemplatePath, { fileName: posts[i-1].fileName, title: posts[i-1].title }) : '',
    next: posts[i+1] ? insertHtmlData(nextTemplatePath, { fileName: posts[i+1].fileName, title: posts[i+1].title }) : ''
  })
})