module.exports = () => {
  const exec = require('../exec-promise')

  exec('git add .')()
    .then(exec('git commit -m "Updating blog"'))
    .then(exec('git push origin master'))
    .catch((e) => console.error(e))
}