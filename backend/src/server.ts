//console.log('🔥 SERVER.TS SE ESTÁ EJECUTANDO');
//console.log('📁 Directorio actual:', process.cwd());
//console.log('🔧 NODE_ENV:', process.env.NODE_ENV);

import express, { Application } from 'express'
import cors from 'cors'

import authRoutes from './routes/auth'
import storeRoutes from './routes/stores'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'

import { requireAuth } from './middleware/auth'
import { errorHandler } from './middleware/errorHandler'

const app: Application = express()

app.use(cors())
app.use(express.json())

// ✅ RUTA RAÍZ - AHORA RESPONDERÁ A /
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend de Ecosystemslab03 funcionando!',
    status: 'online',
    timestamp: new Date().toISOString()
  })
})

// ✅ HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'backend' })
})

// Rutas públicas (login, registro)
app.use('/auth', authRoutes)

// Rutas protegidas con middleware de autenticación
app.use('/stores', requireAuth, storeRoutes)
app.use('/products', requireAuth, productRoutes)
app.use('/orders', requireAuth, orderRoutes)

// Middleware global de manejo de errores
app.use(errorHandler)

// ✅ Exportar para Vercel
export default app

// ✅ Solo escuchar en local
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000')
  })
}