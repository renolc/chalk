const path = require('path')

module.exports = {
  chalkPath: path.resolve(__dirname, '..'),
  
  orderPath: './meta/order.json',
  indexTemplatePath: './meta/templates/index.html',
  postTemplatePath: './meta/templates/post.html',
  prevTemplatePath: './meta/templates/prev.html',
  nextTemplatePath: './meta/templates/next.html',
  itemTemplatePath: './meta/templates/item.html',

  mdDir: './meta/mds',
  postsDir: './posts',
}