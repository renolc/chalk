const path = require('path')
const { mkdir, git, cp } = require('cmd-executor')

const { chalkPath } = require('../utils/consts')

const log = console.log

module.exports = async (repoUrl) => {
  try {
    await git.init()
    await git.remote.add('origin', repoUrl)
    
    await cp(`-r ${chalkPath}/docs/*`, './')

    await git.add('.')
    await git.commit('-m "New chalk blog created"')

    log('done!')
  } catch (e) {
    log(e.toString())
  }
}