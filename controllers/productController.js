const Product = require('../models/schemaStore')

const getAllProducts  = async (req,res) => {
    const {query_params:params} = req.query
    try{
        const all_products = await Product.find(params)
        res.status(200).json({all_products,nHits:all_products.length})
    }catch(error){
        return res.status(500).json({'success':false, 
            "msg":error
        })
    }
}

const getProduct  = async (req,res) => {

    const {featured,NumericFilter,company,name,sort,fields} = req.query
    const query_obj = {}
    if(featured){
        query_obj.featured = featured
    }
    if(name){
        query_obj.name = { $regex : name , $options : 'i'}
    }
    if(company){
        query_obj.company = company
    }
    if(NumericFilter){
        const opMap = {
            '>':'$gt',
            '<':'$lt',
            '=':'$eq'
        }
        const regEx = /\b(>|<|=)\b/g

        let queryString = NumericFilter.replace(
            regEx,
            (match) => { return `-${opMap[match]}-`}
        )
        const options = ['price','rating']

        const field= queryString.split(',').forEach((val)=>{
            const [field,operator,value] = val.split('-')
            if(options.includes(field)){
                query_obj[field] = { [operator] : Number(value) }
            }
        })

        // console.log(query_obj)
    }
    
    let products = Product.find(query_obj)

    if(sort){
        const sortList = sort.split(',').join(' ')
        products = products.sort(sortList)
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = products.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page) * (req.query.skip);

    result = result.skip(skip).limit(limit);

    const fetchProducts = await products

    return res.status(200).json({fetchProducts,nHits : fetchProducts.length})
}

module.exports = { getProduct , getAllProducts}