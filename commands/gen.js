module.exports = () => {
  const fs = require('fs')
  const path = require('path')
  const hljs = require('highlight.js')
  const get = require('obj-get')
  const md = require('markdown-it')({
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try { return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>` }
        catch (_) {}
      }

      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
  })

  const exec = require('../exec-promise')

  const mdDir = './mds'
  const wwwDir = './'
  const postsDir = path.resolve(wwwDir, 'posts')

  if (!fs.existsSync(mdDir)) return
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir)

  const files = fs.readdirSync(mdDir).reverse()

  files.forEach((file, index) => {
    const data = genMetaData(file, index)
    fs.writeFileSync(data.path, formatPage(data))
  })

  function getDate (file) {
    return file.split('.')[0]
  }

  function moveImages (mdPath, markdown, isIndex) {
    const images = /<img.*src=['"](.*?)['"].*>/g
    var res
    var mdCopy = markdown

    while ((res = images.exec(markdown)) !== null) {
      if (!fs.existsSync('./images')) fs.mkdirSync('./images')

      const oldPath = res[1]
      const imageName = path.basename(oldPath)
      const relativePath = isIndex ? './images' : '../images'

      if (oldPath.startsWith(relativePath)) continue

      const newPath = `${relativePath}/${imageName}`

      if (!oldPath.startsWith('./images') && !oldPath.startsWith('../images'))
        exec(`cp ${oldPath} ${newPath}`)()

      mdCopy = mdCopy.split(oldPath).join(newPath)
    }

    fs.writeFileSync(mdPath, mdCopy)

    return mdCopy
  }

  function genMetaData (file, index) {
    const mdPath = path.resolve(mdDir, file)
    var markdown = fs.readFileSync(mdPath, { encoding: 'utf8' })
    markdown = moveImages(mdPath, markdown, index === 0)

    const date = getDate(file)
    const data = {
      isIndex: (index === 0),
      date: date,
      body: md.render(markdown),
      path: (index === 0) ? path.resolve(wwwDir, 'index.html') : path.resolve(postsDir, `${date}.html`)
    }

    if (index < files.length - 1) {
      const prevDate = getDate(files[index+1])
      data.prev = {
        date: prevDate,
        url: `/posts/${prevDate}`
      }
    }

    if (index > 0 ) {
      const nextDate = getDate(files[index-1])
      data.next = {
        date: nextDate,
        url: (index === 1) ? '/' : `/posts/${nextDate}`
      }
    }

    return data
  }

  function renderIf(cond, render) {
    return cond ? render : ''
  }

  function formatPage (data) {
    const stylePath = data.isIndex ? './style.css' : '../style.css'

    return `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="${stylePath}">
          <title>${data.date}</title>
        </head>
        <body>
          <div class="content">
            ${
              renderIf(data.prev, `<a class="btn left" href="${get(data.prev, 'url')}">&leftarrow; ${get(data.prev, 'date')}</a>`) +
              renderIf(data.next, `<a class="btn right" href="${get(data.next, 'url')}">${get(data.next, 'date')} &rightarrow;</a>`)
            }
            ${data.body}
          </div>
        </body>
      </html>
    `
  }
}