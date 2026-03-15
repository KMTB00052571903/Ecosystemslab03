import { Router } from 'express'
import { register, login } from '../controllers/authController'

const router = Router()

// Registro de usuario (si es store, crea tienda asociada)
router.post('/register', register)

// Login de usuario (devuelve datos + rol)
router.post('/login', login)

export default router
