const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
  create(req, res) {
    Category.all()
      .then(results => {
        const categories = results.rows

        return res.render('products/create.njk', { categories })
      }).catch(err => {
        throw new Error(err)
      })
  },
  async post(req, res) {
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '') {
        return res.send('Please fill all the fields!')
      }
    }

    const results = await Product.create(req.body)
  }
}