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
    prev: posts[i-1] ? insertHtmlData(prevTemplatePath, { url: `/posts/${posts[i-1].fileName}`, text: posts[i-1].title }) : '',
    next: posts[i+1] ? insertHtmlData(nextTemplatePath, { url: `/posts/${posts[i+1].fileName}`, text: posts[i+1].title }) : ''
  })
})