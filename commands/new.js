const fs = require('fs')
const path = require('path')

const exec = require('../exec-promise')

const mdDir = './mds'

if (!fs.existsSync(mdDir)) fs.mkdirSync(mdDir)

const today = new Date()
today.setMinutes(today.getMinutes() - today.getTimezoneOffset())

const date = today.toISOString().substring(0, 10)
const count = fs.readdirSync('./mds').filter((item) => item.includes(date)).length
const name = (count) ? `${date}${String.fromCharCode(97+count)}.md` : `${date}.md`

const filePath = path.resolve(mdDir, name)

exec(`touch ${filePath}`)()
  .then((exec(`open ${filePath}`)))