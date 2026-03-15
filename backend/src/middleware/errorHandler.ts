import type { Request, Response, NextFunction } from 'express'

/**
 * Middleware global para manejar errores.
 * Captura cualquier excepción y devuelve una respuesta uniforme.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
}
