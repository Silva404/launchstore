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
      }).filter((product, index) => index > 2 ? false : true)

      const products = await Promise.all(productsPromise)

      return res.render('search/index', { products })
    } catch (err) {
      console.log(err)
    }
  }
}