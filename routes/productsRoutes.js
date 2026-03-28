const express = require('express')

const router = express.Router()

const { getProduct , getAllProducts } = require('../controllers/productController.js')

router.route('/test').get(getAllProducts)
router.route('/').get(getProduct)

module.exports = { router }