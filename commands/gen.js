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

function genMetaData (file, index) {
  const date = getDate(file)
  const data = {
    date: date,
    body: md.render(fs.readFileSync(path.resolve(mdDir, file), { encoding: 'utf8' })),
    path: (index === 0) ? path.resolve(wwwDir, 'index.html') : path.resolve(postsDir, `${date}.html`)
  }

  if (index < files.length - 1) {
    const prevDate = getDate(files[index+1])
    data.prev = {
      date: prevDate,
      url: `/posts/${prevDate}.html`
    }
  }

  if (index > 0 ) {
    const nextDate = getDate(files[index-1])
    data.next = {
      date: nextDate,
      url: (index === 1) ? '/' : `/posts/${nextDate}.html`
    }
  }

  return data
}

function renderIf(cond, render) {
  return cond ? render : ''
}

function formatPage (data) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./style.css">
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