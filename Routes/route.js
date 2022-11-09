const { Router } = require('express')
const express=require('express')
const router=express()
const productController=require('../controller/controller')
const categoryController=require('../controller/categoryController')

router.post('/register',productController.product)
router.get('/get',productController.getProduct)
router.put('/products/:productId',productController.updateProduct)
router.delete('/products/:productId',productController.deletedById)

router.post('/registercat',categoryController.category)

router.put('/category/:categoryId',categoryController.updateCategory)

router.delete('/category/:categoryId',categoryController.categoryDelete)



module.exports=router