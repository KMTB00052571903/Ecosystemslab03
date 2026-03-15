import type { Request, Response, NextFunction } from 'express'

/**
 * Middleware para validar que el usuario tenga un rol específico.
 * Se espera que el rol venga en el token o en un header (ejemplo: x-role).
 */
export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Si en requireAuth guardaste el usuario en req.user, puedes leerlo aquí
    const user = (req as any).user
    const userRole = user?.role || req.headers['x-role']

    if (!userRole) {
      return res.status(403).json({ error: 'No role provided' })
    }

    if (userRole !== role) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' })
    }

    next()
  }
}
