const db = require('../../config/db')
const fs  = require('fs')

module.exports = {
  create({ filename, path, product_id }) {
    const query = `
      INSERT INTO files (
        name,
        path,
        product_id
      ) VALUES ($1, $2, $3) 
      RETURNING id
    `

    const values = [
      filename,
      path,
      product_id
    ]

    return db.query(query, values)
  },
  async delete(id) {
    const results = await db.query(`SELECT * FROM files WHERE id = $id`), [id]

    fs.unlinkSync()

    return db.query(`
      DELETE FROM * files WHERE id = $1
    `, [id])
  }
}