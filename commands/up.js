const { git } = require('cmd-executor')

module.exports = async () => {
  try {
    await git.add('.')
    await git.commit('-m "Updating blog"')
    await git.push('origin', 'master')
  } catch (e) {
    console.log(e)
  }
}