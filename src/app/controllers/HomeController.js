const { formatPrice } = require('../../lib/utils')

const File = require('../models/File')
const Product = require('../models/Product')

module.exports = {
  async index(req, res){
    let results = await Product.all()
    const products = results.rows

    if (!products) return res.send('Products not found!')

    
  }
}