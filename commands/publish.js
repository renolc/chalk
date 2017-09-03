const { git } = require('cmd-executor')

const readOrder = require('../utils/read-order')
const getPostsData = require('../utils/get-posts-data')
const getPostsInOrder = require('../utils/get-posts-in-order')
const writePosts = require('../utils/write-posts')
const writeIndex = require('../utils/write-index')
const updateRss = require('../utils/update-rss')

const log = console.log

module.exports = async () => {
  await git.pull()

  const order = readOrder()
  const posts = getPostsData(order)
  const postsInOrder = getPostsInOrder(posts, order)
  writePosts(posts)
  writeIndex(postsInOrder)
  updateRss(postsInOrder)

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