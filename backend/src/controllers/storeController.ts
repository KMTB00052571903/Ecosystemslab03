import type { Request, Response } from 'express'
import { supabase } from '../db'

// Listar todas las tiendas
export async function getStores(req: Request, res: Response) {
  const { data, error } = await supabase.from('stores').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

// Abrir o cerrar tienda
export async function toggleStore(req: Request, res: Response) {
  const { id } = req.params
  const { isOpen } = req.body

  if (typeof isOpen !== 'boolean') {
    return res.status(400).json({ error: 'isOpen debe ser booleano' })
  }

  const { data, error } = await supabase
    .from('stores')
    .update({ isOpen })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}
