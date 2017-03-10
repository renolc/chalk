const { readFileSync, writeFileSync } = require('fs')
const RSS = require('rss')

const { rssOptionsPath, rssPath } = require('./consts')

module.exports = (items) => {
  const options = JSON.parse(readFileSync(rssOptionsPath, 'utf8'))
  const feed = new RSS(options)

  items.forEach((item) => {
    feed.item({
      title: item.title,
      description: item.firstP,
      date: item.date,
      url: `${options.site_url}/posts/${item.fileName}`
    })
  })

  writeFileSync(rssPath, feed.xml({ indent: true }))
}