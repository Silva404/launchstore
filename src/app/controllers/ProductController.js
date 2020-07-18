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

    let results = await Product.create(req.body)
    const productId = results.rows[0].id

    return res.redirect(`/products/${productId}`)
  },
  async edit(req, res) {
    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if (!product) return res.send('Product not found!')

    results = await Category.all()
    const categories = results.rows

    return res.render('products/create.njk', { product, categories })
  }
}