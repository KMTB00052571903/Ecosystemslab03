import type { Request, Response } from 'express'
import { supabase } from '../db.js'

export async function getStores(req: Request, res: Response) {
  const { data, error } = await supabase.from('stores').select('*')
  if (error) return res.status(400).json({ error })
  res.json(data)
}

export async function toggleStore(req: Request, res: Response) {
  const { id } = req.params
  const { isOpen } = req.body

  const { data, error } = await supabase
    .from('stores')
    .update({ isOpen })
    .eq('id', id)
    .select()

  if (error) return res.status(400).json({ error })
  res.json(data)
}
