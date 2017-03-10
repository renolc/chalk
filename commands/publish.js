const { readFileSync, writeFileSync } = require('fs')
const { git } = require('cmd-executor')

const md = require('../utils/md-with-highlight')
const readOrder = require('../utils/read-order')
const writeHtmlFile = require('../utils/write-html-file')
const insertHtmlData = require('../utils/insert-html-data')
const getHtmlContent = require ('../utils/get-html-content')
const {
  mdDir,
  postsDir,
  postTemplatePath,
  indexTemplatePath,
  prevTemplatePath,
  nextTemplatePath,
  itemTemplatePath
} = require('../utils/consts')

const log = console.log

module.exports = async () => {
  const posts = readOrder().map((mdFile, i) => {
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

  const items = posts.map((post, i) => {
    writeHtmlFile(`${postsDir}/${post.fileName}.html`, postTemplatePath, {
      title: post.title,
      body: post.body,
      prev: posts[i-1] ? insertHtmlData(prevTemplatePath, { fileName: posts[i-1].fileName, title: posts[i-1].title }) : '',
      next: posts[i+1] ? insertHtmlData(nextTemplatePath, { fileName: posts[i+1].fileName, title: posts[i+1].title }) : ''
    })

    return insertHtmlData(itemTemplatePath, {
      fileName: post.fileName,
      title: post.title,
      date: post.date,
      firstP: post.firstP
    })
  }).reverse().join('\n')

  writeHtmlFile('./index.html', indexTemplatePath, { items })

  try {
    await git.add('.')
    const status = await git.status()
    if (!status.includes('nothing to commit')) {
      await git.commit('-m "Publishing new content"')
    }
    const unpushed = await git.log('origin/master..HEAD')
    if (unpushed) {
      await git.push('origin', 'master')
      log('Published!')
    } else {
      log('Nothing to publish')
    }
  } catch (e) {
    log(e.toString())
  }
}