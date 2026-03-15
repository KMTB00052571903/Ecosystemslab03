import type { Request, Response } from 'express'
import { supabase } from '../db'

export async function register(req: Request, res: Response) {
  const { name, email, password, role, storeName } = req.body

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' })
  }

  const { data: user, error } = await supabase
    .from('users')
    .insert([{ name, email, password, role }])
    .select()
    .single()

  if (error) return res.status(400).json({ error })

  let store = null
  if (role === 'store') {
    const { data: newStore } = await supabase.from('stores').insert([
      { name: storeName, isOpen: true, userId: user.id }
    ]).select().single()
    store = newStore
  }

  res.json({ user, store })
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
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  res.json(user)
}
