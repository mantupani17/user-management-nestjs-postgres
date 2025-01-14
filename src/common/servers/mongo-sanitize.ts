import * as mongoSanitize from 'express-mongo-sanitize'
import { INestApplication } from '@nestjs/common'

export function sanitizeMongoQuery(app: INestApplication) {
  app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  )
}
