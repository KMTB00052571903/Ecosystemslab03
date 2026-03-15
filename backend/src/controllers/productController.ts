import type { Request, Response } from 'express'
import { supabase } from '../db.js'

// Crear producto
export async function createProduct(req: Request, res: Response) {
  const { name, price, stock, storeId } = req.body
  if (!name || !price || !storeId) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' })
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, stock, storeId }])
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

// Obtener productos por tienda
export async function getProductsByStore(req: Request, res: Response) {
  const { storeId } = req.params
  const { data, error } = await supabase.from('products').select('*').eq('storeId', storeId)
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

// Actualizar producto
export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params
  const { name, price, stock } = req.body

  const { data, error } = await supabase
    .from('products')
    .update({ name, price, stock })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

// Eliminar producto
export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Producto eliminado' })
}
