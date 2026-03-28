const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            required:[true,"please provide a name"]
        },
        price : {
            type : Number,
            requires:[true,"please provide a price"]
        },
        rating:{
            type:Number,
            default:4.0
        },
        featured:{
            type:String,
            required:false
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        company:{
            type:String,
            enum:{
                values:['ikea','liddy','marcos',"caressa"],
                message:"{VALUE} is not in the catalog"
            }
        }
    }
)

module.exports = mongoose.model('Product',productSchema)