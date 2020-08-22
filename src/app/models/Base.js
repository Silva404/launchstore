const db = require("../../config/db");

function find(filters, table) {
  let query = `SELECT * FROM ${table}`;

  Object.keys(filters).map((key) => {
    query += `${key}`;

    Object.keys(filters[key]).map((field) => {
      query += `${field} = '${filters[key][field]}'`;
    });
  });
}

const Base = {
  init({ table }) {
    if (!table) throw new Error("Invalid params");

    this.table = table;

    return this;
  },
  async create(fields) {
    try {
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        keys.push(key);
        values.push(fields[key]);
      });

      const query = `
        INSERT INTO ${this.table} (${keys.join(",")}) 
        VALUES (${values.join(",")})
        RETURNING id`;

      const results = await db.query(query);

      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },
  async findOne(filters) {
    let query = `SELECT * FROM ${this.table}`;

    Object.keys(filters).map((key) => {
      query = `
        ${query}
        ${key}
      `;
      Object.keys(filters[key]).map((field) => {
        query = `${query} ${field} = '${filters[key][field]}'`;
      });
    });

    const results = await db.query(query);

    return results.rows[0];
  },
  update(id, fields) {
    let update = [];

    Object.keys(fields).map((key, index, array) => {
      const line = (`${key}` = `${fields[key]}`);
      update.push(line);
    });

    let query = `UPDATE ${this.table} 
    SET ${update.join(",")} WHERE id = ${id}`;

    return db.query(query);
  },
  delete(id) {
    return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  },
};

module.exports = Base;
