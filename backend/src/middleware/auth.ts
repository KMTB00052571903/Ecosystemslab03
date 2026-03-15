import type { Request, Response, NextFunction } from 'express'
import { supabase } from '../db.js'

/**
 * Middleware para validar que el usuario esté autenticado.
 * Se espera un token en el header Authorization: Bearer <token>
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.replace('Bearer ', '')

  // Validar token con Supabase
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  // Guardar usuario en la request para usar en controladores
  ;(req as any).user = user

  next()
}
