module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },
  post(req, res) {
    const keys = new Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '') {
        return res.send("Please fill all the fields")
      }
    }

    const { email, cpf_cnpj } = req.body
    const user = await User.findOne({
      where: { email },
      or: { cpf_cnpj }
    })
    

  }
}