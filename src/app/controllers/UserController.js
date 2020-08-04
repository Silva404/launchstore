const User = require('../models/User')

module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },
  async post(req, res) {
    return res.render('user/register', {
      user: req.body,
      sucess: 'Cadastro com sucesso.'
    })
  }
}