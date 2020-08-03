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

    //if user exists !== não deixar cpf duplicado
    const { email, cpf_cnpj } = req.body
    const user = await user.findOne()

    //check password matches  
  }
}