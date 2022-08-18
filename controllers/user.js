const {User, Profile} = require('../models')

class UserController {
  static registerForm (req, res) {
    res.render('register')
  }
  static postRegister (req, res) {
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.create(user)
    .then(result => {
      // res.redirect('/')
    })
    .catch(err=>{
      res.send(err)
    })
  }
}

module.exports = UserController