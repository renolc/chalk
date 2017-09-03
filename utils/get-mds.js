const { readdirSync } = require('fs')

const { mdDir } = require('./consts')

module.exports = () => readdirSync(mdDir)
  .filter(i => i.endsWith('.md'))
  .map(i => i.replace('.md', ''))