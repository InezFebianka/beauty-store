const router = require('express').Router()
const express = require('express')
const Controller = require('../controllers/controller')
const ProductController = require('../controllers/productController')
router.use(express.urlencoded({extended:true}))

//landingpage
router.get('/', Controller.index)

//register, login, logout
router.get('/register', Controller.formRegis)
router.post('/register', Controller.createRegis)
router.get('/login', Controller.formLogin)
router.post('/login', Controller.createLogin)
router.get('/logout', Controller.logoutGo)

//middleware session
router.use(function(req, res, next){
    if(!req.session.userId){
        let error = 'You Have to Login first'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/user/:userid/profile', Controller.profileShow)
router.get('/user/:userid/formProfile', Controller.formProfile)
router.post('/user/:userid/formProfile', Controller.createProfile)

router.get('/product', ProductController.showProduct)
router.get('/productDetail/:idProduct', ProductController.detailProduct)
router.get('/product/category/:categoryid', ProductController.productCategoryId)
router.get('/product/user/:userId', ProductController.productUserId)

//only seller when finish fill form profile
router.get('/user/:userid/addProduct', ProductController.formAddProduct)
router.post('/user/:userid/addProduct', ProductController.createProduct)


//middleware session for admin only
router.use(function(req, res, next){
    if(req.session.userRole !== 'admin'){
        let error = 'You Have to Login as Admin to proceed'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})
// only admin
router.get('/product/:userid/:productId/editProduct', ProductController.formEditProduct)
router.post('/product/:userid/:productId/editProduct', ProductController.editProduct)
router.get('/product/:productId/deleteProduct', ProductController.deleteProduct)



module.exports = router