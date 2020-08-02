const db = require('../../config/db')

module.exports = { 
  async all() {
    const results = await db.query(`SELECT * FROM categories`)

    return results.rows
  }
}