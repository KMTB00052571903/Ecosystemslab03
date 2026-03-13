import type { Request, Response } from 'express'
import { supabase } from '../db.js'

export async function createProduct(req: Request, res: Response) {
  const { name, price, storeId } = req.body

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, storeId }])
    .select()

  if (error) return res.status(400).json({ error })
  res.json(data)
}

export async function getProductsByStore(req: Request, res: Response) {
  const { storeId } = req.params

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('storeId', storeId)

  if (error) return res.status(400).json({ error })
  res.json(data)
}
