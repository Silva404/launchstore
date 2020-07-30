const { formatPrice } = require('../../lib/utils')

const Product = require('../models/Product')

module.exports = {
  async index(req, res){
    let results = await Product.all()
    const products = results.rows
    console.log(products);

    if (!products) return res.send('Products not found!')

    async function getImage(productId) {
      let results = await Product.files(product.Id)
      const files = results.rows.map(file => 
        `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      )

      return files[0]
    }

    const productsPromise = products.map(async product => {
      product.image = await getImage(product)
      product.oldPrice = formatPrice(product.old_price)
      product.price = formatPrice(product.price)

      return product
    }).filter((product, index) => index > 2 ? false : true)

    const eachProductFixed = await Promise.all(productsPromise)

    return res.render('home/index', { products: eachProductFixed })
  }
}