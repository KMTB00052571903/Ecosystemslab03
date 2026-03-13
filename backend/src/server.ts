import express from 'express'
import cors from 'cors'
import type { Application } from 'express'

import authRoutes from './routes/auth.js'
import storeRoutes from './routes/stores.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/stores', storeRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000')
})
