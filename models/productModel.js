const mongoose=require('mongoose')
const objectId=mongoose.Types.ObjectId
const productSchema=new mongoose.Schema({

    name:{
        type:String,
    },
    deletedAt: {
        type: Date
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryId:{
        type:objectId,
        ref:"categories"
    },
    categoryName:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('product',productSchema)