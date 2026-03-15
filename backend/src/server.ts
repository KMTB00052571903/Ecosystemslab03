import express from 'express'
import cors from 'cors'
import type { Application } from 'express'

import authRoutes from './routes/auth.js'
import storeRoutes from './routes/stores.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

import { requireAuth } from './middleware/auth.js'
import { errorHandler } from './middleware/errorHandler.js'

const app: Application = express()

app.use(cors())
app.use(express.json())

// Rutas públicas (login, registro)
app.use('/auth', authRoutes)

// Rutas protegidas con middleware de autenticación
app.use('/stores', requireAuth, storeRoutes)
app.use('/products', requireAuth, productRoutes)
app.use('/orders', requireAuth, orderRoutes)

// Middleware global de manejo de errores
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000')
})
