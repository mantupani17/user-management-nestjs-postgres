import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerService } from './common/servers/swagger'
import { ConfigService } from '@nestjs/config'
import { WinstonLoggerService } from './common/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const cfg = app.get(ConfigService)
  const port = cfg.get<number>('app_port')
  app.useGlobalInterceptors(new LoggingInterceptor())

  app.setGlobalPrefix('api')

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  const logger = app.get(WinstonLoggerService)

  // Swagger Service
  new SwaggerService(app)

  await app.listen(port)
  logger.log(`Application runnig on port - ${port}`)
}
bootstrap()
