#!/usr/bin/env node
const log = console.log

const cmd = process.argv[2]

switch (cmd) {
  case 'init':
    require('./commands/init.js')(process.argv[3])
    break
  
  case 'new':
    require('./commands/new.js')
    break
  
  case 'up':
    require('./commands/up.js')
    break
  
  case 'gen':
    require('./commands/gen.js')
    break

  default:
    log(`
  Usage: chalk <command>

  Commands:
    init <githubRepo>  init a new blog
    new                create a new post
    up                 update blog with new posts
`)
}