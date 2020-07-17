const db = require('../../config/db')

module.exports = {
  create(data) {
    const query = `
      INSERT INTO products (
        name
      ) VALUES ($1) 
      RETURNING id
    `

    const values = (
      data.name
    )

    db.query(`query, values`)
  }
}