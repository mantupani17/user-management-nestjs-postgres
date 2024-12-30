import { INestApplication } from '@nestjs/common'

export function enableCors(app: INestApplication) {
  app.enableCors({
    origin: ['http://example.com'], // Allow specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
    credentials: true, // Allow cookies or credentials
  })
}
