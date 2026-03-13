import type { Request, Response } from 'express'
import { supabase } from '../db.js'

export async function register(req: Request, res: Response) {
  const { name, email, password, role, storeName } = req.body

  const { data: user, error } = await supabase
    .from('users')
    .insert([{ name, email, password, role }])
    .select()

  if (error) return res.status(400).json({ error })

  if (role === 'store') {
    await supabase.from('stores').insert([
      { name: storeName, isOpen: true, userId: user[0].id }
    ])
  }

  res.json(user)
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single()

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  res.json(user)
}
