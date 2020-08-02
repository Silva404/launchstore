const { formatPrice } = require('../../lib/utils')

const Product = require('../models/Product')

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.all()

      if (!products) return res.send('Products not found!')

      async function getImage(productId) {
        let results = await Product.files(productId)
        results = results.map(file =>
          `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        )

        return results[0]
      }

      const productsPromise = products.map(async product => {
        product.image = await getImage(product.id)
        product.oldPrice = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        return product
      }).filter((product, index) => index > 2 ? false : true)

      const eachProductFixed = await Promise.all(productsPromise)

      return res.render('search/index', { products: eachProductFixed })
    } catch (err) {
      console.log(err)
    }
  }
}