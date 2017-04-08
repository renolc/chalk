const hljs = require('highlight.js')
const md = require('markdown-it')({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try { return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>` }
      catch (_) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})
module.exports = md