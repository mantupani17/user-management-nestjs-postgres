import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { Logger, ValidationPipe } from '@nestjs/common'
// import { SwaggerService } from './common/servers/swagger'
import { ConfigService } from '@nestjs/config'
// import { WinstonLoggerService } from './common/logger/logger.service'
import { helmetSer } from '@app/common/servers/helmet'
import { requestBodyLimit } from './common/servers/body-limit'
import { PayloadTooLargeFilter } from './common/filters/payload-too-large.filter'
import { sanitizeMongoQuery } from './common/servers/mongo-sanitize'
// import mongoose from 'mongoose'
import * as cookieParser from 'cookie-parser'
import { enableCors } from './common/servers/enable-cors'
// import { MicroserviceOptions, Transport } from '@nestjs/microservices'
// import { CsrfExceptionFilter } from './common/filters/csruf-validate.filter'
// import { initCsurfMiddleware } from './common/csurf.middleware'
import {
  appConfig,
  GenerateSwagger,
  setupOpenTelemetry,
  LoggingInterceptor,
} from 'common-core-pkg'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  ;(
    await setupOpenTelemetry({
      appName: 'User Management(IAM)',
      appVersion: '1.0.0',
      deplomentEnv: 'Local',
      traceUrl: 'http://13.223.184.1:4318/v1/traces',
    })
  ).start()

  // const app = await NestFactory.create(AppModule, {
  //   logger: new WinstonLoggerService(),
  // })

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appConfig,
  )

  const cfg = app.get(ConfigService)
  const logger = new Logger()

  // Setting the request body
  requestBodyLimit(app, cfg.get<number>('request_limit'))
  // helmet to prevent the XSS attack
  helmetSer(app)
  // Sanitize the mongo query
  sanitizeMongoQuery(app)
  // Enabling cors
  enableCors(app, cfg)

  const port = cfg.get<number>('app_port')
  app.useGlobalInterceptors(new LoggingInterceptor() as any)

  // setting up the filter globally
  app.useGlobalFilters(
    new PayloadTooLargeFilter(),
    // new CsrfExceptionFilter()
  )

  app.setGlobalPrefix('api/v1')

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  // using the cookie parser
  app.use(cookieParser())

  // Use CSRF(Cross-Site Request Forgery) protection
  // initCsurfMiddleware(app)

  GenerateSwagger.generate(app as any, {
    description: 'User Management APIs',
    title: 'IAM',
    serverUrl: `http://localhost:${port}/api/v1`,
    version: '1.0.0',
  })

  // mongoose.set('debug', true)
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: [cfg.get<string>('kafka.host')],
  //     },
  //     consumer: {
  //       groupId: cfg.get<string>('kafka.topic'),
  //     },
  //   },
  // })

  // await app.startAllMicroservices()

  await app.listen(port)
  logger.log(`Application running on port - ${port}`)
}
bootstrap()
