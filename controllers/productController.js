const {Category, Product, Profile, User } = require('../models')
const {Op} = require('sequelize')
const qrcode = require('qrcode')

class ProductController{
    static showProduct(req, res) {
        let visitor = {
            usename: req.session.userUsername,
            id: req.session.userId,
            role: req.session.userRole
        }
        let search = req.query.search
        let filter = req.query.filter
        let where = {}
        if(search){
            where.name = {
                [Op.iLike]:`%${search}%`
            }
        }
        if(filter){
            where.UserId = +filter
        }
        Product.findAll({
            include:[Category],
            where       
        })
            .then(result=>{
                User.getAllSeller()
                    .then(allSeller=>{
                        res.render('showProduct' , {result, visitor, allSeller})
                    })
                    .catch(err=>{
                        res.send(err)
                    })
                
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static detailProduct(req, res) {
        let visitor = {
            usename: req.session.userUsername,
            id: req.session.userId,
            role: req.session.userRole
        }
        let targetedId = req.params.idProduct
        Product.findByPk(targetedId,{include:[User, Category]})
            .then(result=>{
                qrcode.toDataURL(`/productDetail/${targetedId}`, (err, src)=>{
                    let qr_code = {source: src}
                    res.render('productDetail', {result, qr_code})
                })
                
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
    }
      
    static formAddProduct(req, res) {
        let visitor = {
            usename: req.session.userUsername,
            id: req.session.userId,
            role: req.session.userRole
        }
        Profile.findOne({
            where: {
                UserId: visitor.id
            }
        })
            .then(hasProfile=>{
                if(hasProfile.length !== 0){
                    console.log(hasProfile);
                   Category.allCategory()
                    .then(result=>{
                        res.render('formAddProduct', {result, visitor})
                    })
                    .catch(err=>{
                        res.send(err)
                    }) 
                }
                
            })
            .catch(err=>{
                res.redirect(`/user/${visitor.id}/profile`)
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
                // console.log(err);
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
                        User.getAllSeller()
                            .then(allSeller=>{
                                console.log(allSeller);
                                res.render('formEditProduct', {result, allCat, allSeller})
                    })
                })     
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
    }

    static editProduct(req, res) {
        let targetedId = req.params.productId
        let body = {
            id:+targetedId,
            UserId:+req.body.UserId,
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
                // console.log(err);
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