const {Category, Product, Profile, User } = require('../models')

class ProductController{
    static showProduct(req, res) {
        Product.findAll()
            .then(result=>{
                res.render('showProduct' , {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static detailProduct(req, res) {
        let targetedId = req.params.idProduct
        Product.findByPk(targetedId,{include:[User, Category]})
            .then(result=>{
                res.render('productDetail', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static productCategoryId(req, res) {
        res.send('masuk h')
    }
      
    static productUserId(req, res) {
        res.send('masuk i')
    }
      
    static formAddProduct(req, res) {
        Category.allCategory()
            .then(result=>{
                res.render('formAddProduct', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }
      
    static createProduct(req, res) {
        let targetedId = req.params.userid
        let body = {
            name: req.body.name,
            UserId: targetedId,
            desc: req.body.desc,
            price: req.body.price,
            CategoryId: req.body.CategoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
            imageUrl: req.body.imageUrl
        }
        Product.create(body)
            .then(result=>{
                res.redirect('/product')
            })
            .catch(err=>{
                res.send(err)
            })

    }

    static formEditProduct(req, res)  {
        let targetedId = req.params.productId
        Product.findByPk(targetedId)
            .then(result=>{
                // console.log(result);
                Category.allCategory()
                    .then(allCat=>{
                        res.render('formEditProduct', {result, allCat})
                    })
                    .catch(err=>{
                        res.send(err)
                    })
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
    }

    static editProduct(req, res) {
        let targetedId = req.params.productId
        let UserId = req.params.userid
        let body = {
            id:+targetedId,
            UserId:+UserId,
            name:req.body.name,
            desc:req.body.desc,
            price:+req.body.price,
            CategoryId:req.body.CategoryId,
            imageUrl:req.body.imageUrl,
        }
        console.log(body);
        Product.update(body, {
            where: {
                id: targetedId
            }
        })
            .then(result=>{
                res.redirect(`/productDetail/${targetedId}`)
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })

    }
      
    static deleteProduct(req, res) {
        let targetedId = req.params.productId
        Product.destroy({
            where:{
                id: targetedId
            }
        })
            .then(result=>{
                res.redirect('/product')
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = ProductController