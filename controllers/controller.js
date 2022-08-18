const {Category, Product, Profile, User} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
  static index(req, res) {
    res.render('index')
  }
  static formRegis(req, res) {
    res.render('formRegis')
  }
  static createRegis(req, res) {
    let body = {
      username: req.body.username,
      email:req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.create(body)
      .then(result=>{
        res.redirect ('/login')
      })
      .catch(err=>{
        res.send(err)
      })
  }
  static formLogin(req, res) {
    let error = req.query.error
    res.render('formLogin',{error})
  }
  static createLogin(req, res) {
    let body = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        username: body.username,
        email: body.email
      }
    })
      .then(result=>{
        if (result){
          const comparing = bcrypt.compareSync(body.password, result.password)

          if(comparing) {

            req.session.userId= result.id
            req.session.userRole= result.role,
            req.session.userUsername= result.username
            
            return res.redirect('/product')

          } else {
            const error = 'invalid password'
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = 'user not found'
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err=>{
        res.send(err)
      })
  }

  static logoutGo(req, res) {
    req.session.destroy(err=>{
      if(err) {
        res.send(err);
      }else {
        res.redirect('/login')
      }
    })
  }

  static profileShow(req, res) {
    res.send('masuk e')
  }

  static formProfile(req, res) {
    res.send('masuk e')
  }

  static createProfile(req, res) {
    res.send('masuk f')
  }
  
}

module.exports = Controller