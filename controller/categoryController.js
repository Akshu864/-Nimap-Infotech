const productModel=require('../models/productModel')
const categoryModel=require('../models/categoryModel')

const category=async function(req,res){
    try{
        let data=req.body

        let productId=req.params.productId

        data["productId"]=productId

        let createCat=await categoryModel.create(data)
        res.status(201).send({status:true,msg:'category created successfully',data:createCat})

    }
    catch (error) {
    res.status(500).send({ status: false, message: error.message })
      }
     }





     const updateCategory=async function(req,res){
        let categoryId=req.params.categoryId
        console.log(categoryId)
        let data=req.body
        const {name}=data
        let finalUpdate=await categoryModel.findOneAndUpdate({_id:categoryId},{$set:{name:name}},{new:true,upsert:true})
        console.log(finalUpdate)
        return res.status(200).send({status:true,message:"successfully changed",data:finalUpdate})
      }



      //delete api
      const categoryDelete = async function(req,res){
        let data = req.params.categoryId
       
       //  let productId = await productModel.findOne({_id:data})

           
       let update=await categoryModel.findOneAndUpdate({_id:data},{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true,upsert:true})
       console.log(update)
        res.status(200).send({status:true,data:update,message:"successfully deleted  "})
    

    
    }

     module.exports={category,updateCategory,categoryDelete}