import { Router } from 'express'
import { 
  createProduct, 
  getProductsByStore, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js'

const router = Router()

// Crear producto
router.post('/', createProduct)

// Obtener productos de una tienda
router.get('/:storeId', getProductsByStore)

// Actualizar producto
router.put('/:id', updateProduct)

// Eliminar producto
router.delete('/:id', deleteProduct)

export default router
