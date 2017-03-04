const path = require('path')
const log = console.log

const { git, cp } = require('cmd-executor')

const chalkPath = path.resolve(__dirname, '..')

module.exports = async (gitRepo) => {
  try {
    log('Initializing git repo...')
    await git.init()

    log('Adding git remote origin...')
    await git.remote.add('origin', gitRepo)

    log('Copying documents...')
    await cp(`-r ${chalkPath}/docs/*`, './')

    log('Making initial git commit...')
    await git.add('.')
    await git.commit('-m "New chalk blog created"')

    log('Done!')
  } catch (e) {
    log(e.toString())
  }
}