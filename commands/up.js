const { chalk, git } = require('cmd-executor')
const log = console.log

module.exports = async () => {
  try {
    await chalk.gen()
    await git.add('.')
    await git.commit('-m "Updating blog"')
    log(await git.push('origin', 'master'))
  } catch (e) {
    log(e.toString())
  }
}