import { Router } from 'express'
import { 
  createOrder, 
  getOrders, 
  updateOrderStatus 
} from '../controllers/orderController'

const router = Router()

// Crear pedido
router.post('/', createOrder)

// Listar pedidos (con filtros por consumerId, storeId, deliveryId)
router.get('/', getOrders)

// Actualizar estado del pedido
// Ejemplo: PATCH /orders/:id/status con body { "status": "accepted" }
router.patch('/:id/status', updateOrderStatus)

export default router
