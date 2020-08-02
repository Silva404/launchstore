const express = require('express')
const routes = express.Router()

const multer = require('./app/middlewares/multer')
const ProductController = require('./app/controllers/ProductController')
const SearchController = require('./app/controllers/SearchController')


routes.get('/products/search', SearchController.index)

routes.get('/products/create', ProductController.create)
routes.get('/products/:id', ProductController.show)
routes.get('/products/:id/edit', ProductController.edit)
routes.post('/products', multer.array('photos', 6), ProductController.post)
routes.put('/products', multer.array('photos', 6), ProductController.put)
routes.delete('/products', ProductController.delete)

module.exports = routes