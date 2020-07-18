const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/ProductController')

routes.get('/',(req, res) => {
    return res.render('layout.njk')
})

routes.get('/products/create', ProductController.create)
// routes.get('/products/:id', ProductController.show)
routes.get('/products/:id/edit', ProductController.edit)
routes.post('/products', ProductController.post)


// alias
routes.get('/ads/create',(req, res) => {
    return res.rendirect('/products/create')
})  

module.exports = routes