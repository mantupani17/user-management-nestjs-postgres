import { INestApplication } from '@nestjs/common'
import * as csurf from 'csurf'

export function initCsurfMiddleware(app: INestApplication) {
  // Apply CSRF middleware only to specific routes
  app.use((req, res, next) => {
    const excludeCsurfRoutes = [
      '/api/auth/login',
      '/api/auth/signup',
      '/profile',
      '/api/auth/verify-email',
    ] // Define protected routes
    if (!excludeCsurfRoutes.includes(req.path)) {
      return csurf({
        cookie: {
          httpOnly: true, // Helps prevent XSS
          sameSite: true, // Helps prevent CSRF
        },
      })(req, res, next)
    }
    next()
  })
}
