const User = require('../models/User')
const { compare } = require('bcryptjs')

async function login(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.render('session/login', {
      user: req.body,
      error: "Usuário não cadastrado"
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render('session/login', {
      user: user,
      error: "Senha incorreta"
    })

    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
}

async function forgot(req, res, next) {
  const { email } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) return res.render('session/forgot-password', {
      user: req.body,
      error: "Email não cadastrado"
    })

    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
}

async function reset(req, res, next) {
  try {
    const { email, password, token, passwordRepeat } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.render('session/password-reset', {
      user: req.body,
      token,
      error: "Usuário não cadastrado"
    })

    if (password != passwordRepeat) return res.render('session/password-reset', {
      user: req.body,
      token,
      alert: 'A senha e sua repetição estão incorretas.'
    })

    if (token != user.token) return res.render('session/password-reset', {
      user: req.body,
      token,
      alert: 'Chave inválida, solicite uma nova recuperação de senha'
    })
    
    let now = new Date
    now = now.setHours(now.getHours())

    if (now != user.reset_token_expires) return res.render('session/password-reset', {
      user: req.body,
      token,
      alert: 'Chave expirada, solicite uma nova recuperação de senha'
    })

    req.user = user

    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  login,
  forgot,
  reset
}