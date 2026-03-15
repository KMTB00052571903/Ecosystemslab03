import { Router } from 'express'
import { getStores, toggleStore } from '../controllers/storeController'

const router = Router()

router.get('/', getStores)
router.patch('/:id/toggle', toggleStore)

export default router
