const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')

const { formatPrice, date } = require('../../lib/utils')

module.exports = {
  async create(req, res) {
    try {
      const categories = await Category.findAll()

      return res.render('products/create', { categories })
    } catch (err) {
      console.log(err)
    }
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body)

      for (let key of keys) {
        if (req.body[key] == '') {
          return res.send('Please fill all the fields!')
        }
      }

      if (req.files.length == 0) return res.send('send some file')

      let {
        category_id,
        name,
        description,
        user_id,
        old_price,
        price,
        quantity,
        status } = req.body

      price = price.replace(/\D/g, "")

      const product_id = await Product.create({
        category_id,
        name,
        description,
        user_id: req.session.userId,
        old_price: price,
        price,
        quantity,
        status: 1,
      })

      const filesPromise = req.files.map(file =>
        File.create({
          ...file,
          product_id
        }))

      await Promise.all(filesPromise)

      return res.redirect(`/products/${product_id}/edit`)
    } catch (error) {
      console.error(error);
    }
  },
  async show(req, res) {
    const product = await Product.find(req.params.id)

    const { day, month, hours, minutes, year } = date(product.updated_at)

    product.published = {
      day: `${day}/${month}/${year}`,
      hours: `${hours}h${minutes}`
    }

    product.price = formatPrice(product.price)
    product.old_price = formatPrice(product.old_price)

    let files = await Product.files(product.id)
    files = files.map(file => ({
      ...file,
      path: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    if (!product) return res.send('product not found')

    return res.render('products/show', { product, files })
  },
  async edit(req, res) {
    try {
      const product = await Product.find(req.params.id)

      if (!product) return res.send('Product not found!')

      product.old_price = formatPrice(product.old_price)
      product.price = formatPrice(product.price)

      const categories = await Category.all()

      let files = await Product.files(product.id)
      files = files.map(file => ({
        ...file,
        path: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))

      return res.render('products/edit', { product, categories, files })
    } catch (error) {
      console.error(error);
    }
  },
  async put(req, res) {
    try {
      const keys = Object.keys(req.body)

      for (let key of keys) {
        if (req.body[key] == '' && key != "removed_files") {
          return res.send('Please fill all the fields!')
        }
      }

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(file => File.create({ ...file, id: req.body.id }))

        await Promise.all(newFilesPromise)
      }

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',')
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const promiseRemovedFiles = removedFiles.map(id => File.delete(id))

        await Promise.all(promiseRemovedFiles)
      }

      req.body.price = req.body.price.replace(/\D/g, '')

      if (req.body.old_price !== req.body.price) {
        const oldProduct = await Product.find(req.body.id)

        req.body.old_price = oldProduct.price
      }

      let { category_id,
        name,
        description,
        user_id,
        old_price,
        price,
        quantity,
        status } = req.body

      await Product.update(req.body.id, {
        category_id,
        name, 
        description,
        user_id,
        old_price,
        price,
        quantity,
        status
      })

      return res.redirect(`/products/${req.body.id}/edit`)
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    await Product.delete(req.body.id)

    return res.redirect(`/products/create`)
  }
}