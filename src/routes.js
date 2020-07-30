const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/ProductController')
const HomeController = require('./app/controllers/HomeController')
const multer = require('./app/middlewares/multer')

routes.get('/',(req, res) => {
    return res.render('home/index.njk', HomeController.index)
})

routes.get('/products/create', ProductController.create)
routes.get('/products/:id', ProductController.show)
routes.get('/products/:id/edit', ProductController.edit)
routes.post('/products', multer.array('photos', 6), ProductController.post)
routes.put('/products', multer.array('photos', 6), ProductController.put)
routes.delete('/products', ProductController.delete)


// alias
routes.get('/ads/create',(req, res) => {
    return res.rendirect('/products/create')
})  

module.exports = routes