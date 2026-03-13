import { Router } from 'express'
import { createProduct, getProductsByStore } from '../controllers/productController.js'

const router = Router()

router.post('/', createProduct)
router.get('/:storeId', getProductsByStore)

export default router
