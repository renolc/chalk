module.exports = (githubRepo) => {
  const program = require('commander')

  if (!githubRepo) return console.log('\n  Usage: chalk init <githubRepo>\n')

  const fs = require('fs')
  const path = require('path')
  const log = console.log

  const exec = require('../exec-promise')
  const p = require('../generic-promise')

  const chalkPath = path.resolve(__dirname, '..')

  exec('git init', 'Initializing git repo...')()

    .then(exec('touch .git/hooks/pre-commit', 'Setting up pre-commit hook...'))
    .then(p(() => {
      fs.writeFileSync('.git/hooks/pre-commit', `#!/bin/bash
      chalk gen
      git add .`)
    }))
    .then(exec('chmod +x .git/hooks/pre-commit'))

    .then(exec(`git remote add origin ${githubRepo}`, 'Adding git remote origin...'))

    .then(exec(`cp ${chalkPath}/docs/style.css ./`, 'Copying CSS template...'))

    .then(exec('git add .', 'Making initial git commit...'))
    .then(exec('git commit -m "New chalk blog created"'))
    
    .then(() => log('Done!'))
    .catch((e) => console.error(e))
}