const { formatPrice } = require('../../lib/utils')

const Product = require('../models/Product')

module.exports = {
  async index(req, res) {
    try {
      let results,
        params = {}

      const { filter, category } = req.query

      if (!filter) return res.redirect('/')

      params.filter = filter

      if (category) {
        params.category = category  
      }

      results = await Product.search(params)

      async function getImage(productId) {
        let results = await Product.files(productId)
        results = results.map(file =>
          `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        )

        return results[0]
      }

      const productsPromise = results.map(async product => {
        product.image = await getImage(product.id)
        product.oldPrice = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        return product
      })
      // NÃO ENTENDI O PORQUE DO FILTER

      const products = await Promise.all(productsPromise)

      const search = {
        term: req.query.filter,
        total: products.length
      }

      const categories = products.map(product => ({
        id: product.category_id,
        name: product.category_name
      }))

      return res.render('search/index', { products, search, categories })
    } catch (err) {
      console.log(err)
    }
  }
}