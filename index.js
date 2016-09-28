const fs = require('fs')
const path = require('path')
const hljs = require('highlight.js')
const md = require('markdown-it')({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try { return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>` }
      catch (_) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

const mdDir = './posts'
const wwwDir = './www'

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
    path: (index === 0) ? path.resolve(wwwDir, 'index.html') : path.resolve(wwwDir, 'posts', `${date}.html`)
  }

  if (index < files.length - 1) {
    data.prev = `/posts/${getDate(files[index+1])}.html`
  }

  if (index > 0 ) {
    data.next = (index === 1) ? '/' : `/posts/${getDate(files[index-1])}.html`
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
        <link rel="stylesheet" href="/style.css">
        <title>Title - ${data.date}</title>
      </head>
      <body>
        <div class="content">
          ${
            renderIf(data.prev, `<a href="${data.prev}">prev</a>`) +
            renderIf(data.prev && data.next, ' - ') +
            renderIf(data.next, `<a href="${data.next}">next</a>`)
          }
          ${data.body}
        </div>
        <script src="http://livejs.com/live.js"></script>
      </body>
    </html>
  `
}