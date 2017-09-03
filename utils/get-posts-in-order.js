module.exports = (posts, order) => posts.filter(i => order.includes(i.fileName))
  .sort((a, b) => order.indexOf(a.fileName) - order.indexOf(b.fileName))