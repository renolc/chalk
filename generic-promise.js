module.exports = (fn) => () => new Promise((resolve, reject) => {
  try {
    fn()
    return resolve()
  } catch (e) {
    return reject(e)
  }
})