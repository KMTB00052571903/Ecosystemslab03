import type { Request, Response } from 'express'
import { supabase } from '../db.js'

export async function createOrder(req: Request, res: Response) {
  const { consumerId, storeId, items } = req.body

  const { data: order, error } = await supabase
    .from('orders')
    .insert([{ consumerId, storeId, status: 'pending' }])
    .select()

  if (error) return res.status(400).json({ error })

  const orderId = order[0].id
  await supabase.from('order_items').insert(
    items.map((item: any) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity
    }))
  )

  res.json(order)
}

export async function getOrders(req: Request, res: Response) {
  const { data, error } = await supabase.from('orders').select('*')
  if (error) return res.status(400).json({ error })
  res.json(data)
}

export async function updateOrderStatus(req: Request, res: Response) {
  const { id } = req.params
  const { status, deliveryId } = req.body

  const { data, error } = await supabase
    .from('orders')
    .update({ status, deliveryId })
    .eq('id', id)
    .select()

  if (error) return res.status(400).json({ error })
  res.json(data)
}
