require('dotenv').config()

const express = require('express')

const app = express()

const {router} = require('./routes/productsRoutes.js')

const routeNotFound = require('./middlewares/route-error-handler.js')

const errorHandler = require('./middlewares/error-handler.js')

const {connect} = require('./models/connectionDB.js')

// pre req middleware
app.use(express.json())

app.get('/', (req, res)=>{
    console.log("/ route accessed")
    res.status(200).send('<h1>Home Page</h1>')
})

app.use('/api/v1',router)

//post req middleware
app.use(routeNotFound)

app.use(errorHandler)

const start = async() =>{
    try{
        //DB connection
        const port = process.env.PORT || 3000
        app.listen(port , ()=>{
            console.log(`listening on ${port}`)
        })
        const mongoConnector = await connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err)
    }
}

start()
