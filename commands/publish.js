const { git } = require('cmd-executor')

const getPostsData = require('../utils/get-posts-data')
const writePosts = require('../utils/write-posts')
const writeHtmlFile = require('../utils/write-html-file')
const insertHtmlData = require('../utils/insert-html-data')
const updateRss = require('../utils/update-rss')
const {
  indexTemplatePath,
  itemTemplatePath
} = require('../utils/consts')

const log = console.log

module.exports = async () => {
  const posts = getPostsData()
  writePosts(posts)

  const items = posts.map((post, i) => insertHtmlData(itemTemplatePath, {
    fileName: post.fileName,
    title: post.title,
    date: post.date,
    firstP: post.firstP
  })).reverse().join('\n')

  writeHtmlFile('./index.html', indexTemplatePath, { items })

  updateRss(posts)

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