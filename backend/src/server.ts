console.log('🔥 SERVER.TS SE ESTÁ EJECUTANDO');
console.log('📁 Directorio actual:', process.cwd());
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);

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

// Endpoint de prueba ultra simple
app.get('/test', (req, res) => {
  res.send('✅ Funciona!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});



// RUTA RAÍZ
app.get('/', (req, res) => {
  console.log('📍 Ruta / llamada');
  res.json({ 
    message: 'Backend de Ecosystemslab03 funcionando!',
    status: 'online',
    timestamp: new Date().toISOString()
  })
})

// HEALTH CHECK
app.get('/health', (req, res) => {
  console.log('📍 Ruta /health llamada');
  res.json({ status: 'OK', service: 'backend' })
})

// Rutas públicas
app.use('/auth', authRoutes)

// Rutas protegidas
app.use('/stores', requireAuth, storeRoutes)
app.use('/products', requireAuth, productRoutes)
app.use('/orders', requireAuth, orderRoutes)

console.log('✅ Todas las rutas registradas:');
console.log('  - GET /');
console.log('  - GET /health');
console.log('  - /auth/*');
console.log('  - /stores/* (protegida)');
console.log('  - /products/* (protegida)');
console.log('  - /orders/* (protegida)');

// Middleware de errores
app.use(errorHandler)

// Exportar para Vercel
export default app

// Solo para local
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000')
  })
}

// Endpoint de prueba ULTRA simple
app.get('/test', (req, res) => {
  res.send('Funciona!');
});