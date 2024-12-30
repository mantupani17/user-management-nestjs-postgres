import { INestApplication } from '@nestjs/common'
import { json, urlencoded } from 'express'

export function requestBodyLimit(app: INestApplication, limit: any) {
  app.use(json({ limit }))
  app.use(urlencoded({ extended: true, limit }))
}
