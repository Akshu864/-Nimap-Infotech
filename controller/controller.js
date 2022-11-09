const productModel=require('../models/productModel')
const categoryModel=require('../models/categoryModel')
const { update } = require('../models/productModel')
categoryController=require('../controller/categoryController')



//create product api

const product=async function(req,res){
    try{
        let data=req.body
        const {categoryName}=data

        let findCategory=await categoryModel.findOne({name:categoryName})
        if(findCategory){
            data.categoryId=findCategory._id
        }else{
            return res.status(404).send({status:false,msg:"category doesnt exist"})
        }
    

        let productCreate=await productModel.create(data)
        res.status(201).send({status:true,msg:'product created successfully',data:productCreate})

    }
    catch (error) {
    res.status(500).send({ status: false, message: error.message })
      }
     }

    //  //get api
    //   const geProduct=async function(req,res){
    //     let data=req.query
    //     let product=await productModel.find(data)
    //     res.status(200).send({status:true,data:product})
    //   }


    const getProduct=async function(req,res){
   
        try{
             
    
            const{page,limit}=req.query
    
            if(!page) page=1;
            if(!limit) limit=10;
    
            const skip=(page-1)*10
    
            const products=await productModel.find().skip(skip).limit(limit);
    
            res.status(200).send({status:true,page:page,limit:limit,products:products})
    
    
    
        }
        catch(err){
            console.log(err.message)
            return res.status(500).send({status:"error",msg:err.message})
        }
    
    }

      //update api

      const updateProduct=async function(req,res){
        let productId=req.params.productId
        let data=req.body
        let {name}=data
        let allProduct=await productModel.findByIdAndUpdate({_id:productId},{$set:{name:name}},{new:true})
        return res.status(200).send({status:true,message:"successfully changed",data:allProduct})
      }

      //delete api
      const deletedById = async function(req,res){
         let data = req.params.productId
        
        //  let productId = await productModel.findOne({_id:data})

            
        let update=await productModel.findOneAndUpdate({_id:data},{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true,upsert:true})
        console.log(update)
         res.status(200).send({status:true,data:update,message:"successfully deleted  "})
     

     
     }
        
    


      module.exports={product,getProduct,updateProduct,deletedById}
