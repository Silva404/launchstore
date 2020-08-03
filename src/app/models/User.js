const db = require('../../config/db')

module.exports = {
  findOne(filter) {
    let query = `
    SELECT * FROM users
    `

    Object.keys(filters).map(key => {
      query = `
      ${query}
      `
    })
  }
}