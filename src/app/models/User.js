const db = require('../../config/db')

module.exports = {
  findOne(filter) {
    let query = `SELECT * FROM users`

    Object.keys(filter).map(key => {
      query = `
        ${query}
        ${key}
      `
      Object.keys(filter[key]).map(field => {
        query = `${query} ${field} = '${filters[key][field]}'`
      })
    })

    const results = await db.query(query)

    return results.rows[0]
  }
}