#!/usr/bin/env node
const cli = require('ezcli')

cli('chalk')
  .command('init', require('./commands/init'))
  .command('new', require('./commands/new'))
  .command('publish', require('./commands/publish'))
  .process()