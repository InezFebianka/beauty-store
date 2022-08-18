const {Category, Product, Profile, User} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
  static index(req, res) {
    res.render('index')
  }
  static formRegis(req, res) {
    let error = req.query.error
    res.render('formRegis', {error})
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
        let error = []
        if (err.name === 'SequelizeValidationError'){
          err.errors.forEach(el=>{
            error.push(el.message)
          })
                    
        }
        res.redirect(`/register?error=${error}`)
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
          const error = 'Wrong Username and/or Email'
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
    let userId = req.params.userid
    let visitor = {
      usename: req.session.userUsername,
      id: req.session.userId,
      role: req.session.userRole
    }
    Profile.findOne({where: {UserId:userId}})
      .then(result=>{
        res.render('profileView', {result, visitor, userId})
      })
      .catch(err=>{
        res.send(err)
      })
  }

  static formProfile(req, res) {
    let visitor = {
      usename: req.session.userUsername,
      id: req.session.userId,
      role: req.session.userRole
    }
    res.render('formProfile', {visitor})
  }

  static createProfile(req, res) {
    let body = {
      name: req.body.name,
      phone_number: req.body.phone_number,
      nik: req.body.nik,
      age: req.body.age,
      UserId: req.params.userid,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    Profile.create(body)
      .then(result=>{
        res.redirect(`/user/${body.UserId}/profile`)
      })
      .catch(err=>{
        res.send(err)
      })
  }
  
}

module.exports = Controller