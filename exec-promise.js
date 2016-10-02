const exec = require('child_process').exec

module.exports = (cmd, log) => () => new Promise((resolve, reject) => {
  if (log) console.log(log)
  exec(cmd, (err, stdout, stderr) => {
    if (err || stderr) return reject(err || stderr)
    return resolve(stdout)
  })
})