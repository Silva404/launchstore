const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const users = require('./users')
const products = require('./products')

routes.use('/users', users)
routes.use('/products', products)

routes.get('/', HomeController.index)
// alias
routes.get('/ads/create',(req, res) => {
    return res.redirect('/products/create')
})  

routes.get('/accounts',(req, res) => {
    return res.redirect('/users/register')
})  

module.exports = routes