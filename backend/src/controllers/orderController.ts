import type { Request, Response } from 'express'
import { supabase } from '../db.js'

// Crear pedido (consumer)
export async function createOrder(req: Request, res: Response) {
  const { consumerId, storeId, items } = req.body

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .insert([{ consumerId, storeId, status: 'pending' }])
      .select()
      .single()

    if (error) return res.status(400).json({ error: error.message })

    // Insertar items
    await supabase.from('order_items').insert(
      items.map((item: any) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      }))
    )

    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear pedido' })
  }
}

// Listar pedidos (según rol)
export async function getOrders(req: Request, res: Response) {
  const { consumerId, storeId, deliveryId } = req.query

  try {
    let query = supabase.from('orders').select('*')
    if (consumerId) query = query.eq('consumerId', consumerId as string)
    if (storeId) query = query.eq('storeId', storeId as string)
    if (deliveryId) query = query.eq('deliveryId', deliveryId as string)

    const { data, error } = await query
    if (error) return res.status(400).json({ error: error.message })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos' })
  }
}

// Actualizar estado pedido
export async function updateOrderStatus(req: Request, res: Response) {
  const { id } = req.params
  const { status, deliveryId } = req.body

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .update({ status, deliveryId })
      .eq('id', id)
      .select()
      .single()

    if (error) return res.status(400).json({ error: error.message })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar pedido' })
  }
}
