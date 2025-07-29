import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
// import { DocumentsModule } from './documents/documents.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from './roles/roles.module'
import { ModulesModule } from './modules/modules.module'
import { PermissionsModule } from './permissions/permissions.module'
import { RoleModulePermissionsModule } from './role_module_permissions/role_module_permissions.module'
import {
  User,
  Role,
  Permission,
  Client,
  Module as ModuleEntity,
  RoleModulePermission,
  // TrackIngestion,
  // IngestionData
} from './entities'
import { JwtStrategy, JwtService } from '@app/common/jwt'
import { CaslGuard, AbilityService } from '@app/common/ability'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration } from './configs/env.config'
// import { IngestionModule } from './ingestion/ingestion.module'
import { ScheduleModule } from '@nestjs/schedule'
import {
  // PhotosApisService,
  AxiosService,
} from '@app/common/api'
import { SeederService } from '@app/common'
import { UserService } from './user/user.service'
import { CryptoService } from '@app/common/crypto/crypto.service'
import { RolesService } from './roles/roles.service'
// import { WinstonLoggerService } from '@app/common/logger/logger.service'
import { CacheModule } from './cache/cache.module'
import { CacheService } from './cache/cache.service'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
// import { TodoModule } from './todo/todo.module'
// import { TodoStatusModule } from './todo-status/todo-status.module'
// import { ChatModule } from './chat/chat.module'
// import { NotificationModule } from './notification/notification.module'
// import { KafkaModule } from './kafka/kafka.module'
import {
  // EncryptionMiddleware,
  // DecryptionMiddleware,
  ValidateDomainMiddleware,
} from '@app/common/middlewares'
import { EncryptionService } from '@app/common/crypto/encryption.service'
import { EncryptionModule } from './encryption/encryption.module'
import {} from // SyncCleanKeypairSchedulerService,
// IngTrackSchedulerService,
'@app/common/schedulers'
import { Encryption, EncryptionSchema } from './schemas/encryption.schema'
import { MongooseConfigModule, TypeOrmConfigModule } from '@app/common/modules'
import { ClientModule } from './client/client.module'
import { ClientService } from './client/client.service'
import { PermissionsService } from './permissions/permissions.service'
import { ModulesService } from './modules/modules.service'
import { RoleModulePermissionsService } from './role_module_permissions/role_module_permissions.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Make the environment variables globally accessible in the app
    }),

    // Limiting the requests
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('throttle.ttl'),
          limit: config.get('throttle.limit'),
        },
      ],
    }),

    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      // TrackIngestion,
      // IngestionData,
      User,
      Role,
      Client,
      Permission,
      ModuleEntity,
      RoleModulePermission,
    ]),
    AuthModule,
    UserModule,
    // DocumentsModule,
    RolesModule,
    ModulesModule,
    PermissionsModule,
    RoleModulePermissionsModule,
    // IngestionModule,
    ScheduleModule.forRoot(),
    CacheModule,

    // Mongodb implementation
    MongooseConfigModule,
    MongooseModule.forFeature([
      { name: Encryption.name, schema: EncryptionSchema },
    ]),

    // TodoModule,
    // TodoStatusModule,
    // ChatModule,
    // NotificationModule,
    // KafkaModule,
    EncryptionModule,

    ClientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    JwtStrategy,
    AbilityService,
    ClientService,
    CaslGuard,
    // IngTrackSchedulerService,
    AxiosService,
    // PhotosApisService,
    UserService,
    CryptoService,
    RolesService,
    SeederService,
    PermissionsService,
    RoleModulePermissionsService,
    ModulesService,
    // WinstonLoggerService,
    CacheService,
    EncryptionService,
    // SyncCleanKeypairSchedulerService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(EncryptionMiddleware).forRoutes('*') // Apply encryption middleware if needed

    // consumer.apply(DecryptionMiddleware).forRoutes('*') // Apply decryption middleware if needed

    consumer.apply(ValidateDomainMiddleware).forRoutes('*')
  }
}
