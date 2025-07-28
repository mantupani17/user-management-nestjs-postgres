import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export function enableCors(app: INestApplication, cfg: ConfigService) {
  app.enableCors({
    origin: cfg.get<string>('origins').split(','), // Allow specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
    credentials: true, // Allow cookies or credentials
  })
}
