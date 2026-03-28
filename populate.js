require('dotenv').config()

const Product = require('./models/schemaStore.js')

const connect = require("./models/connectionDB.js")

const products_items = require('./products.json')

const start = async() => {
    try{
        await connect(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(products_items)
        console.log('success!')
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start()