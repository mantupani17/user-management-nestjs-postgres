import { INestApplication } from '@nestjs/common'
import helmet from 'helmet'
export const helmetSer = (app: INestApplication) => {
  app.use(
    helmet({
      frameguard: { action: 'deny' }, // Prevent clickjacking
      hidePoweredBy: true, // Remove "X-Powered-By" header
    }),
  )
}
