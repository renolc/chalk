const { readFileSync } = require('fs')

module.exports = (templatePath, data) => {
  let html = readFileSync(templatePath, 'utf8')
  
  Object.entries(data).forEach((i) => {
    html = html.replace(`{{${i[0]}}}`, i[1])
  })

  return html
}