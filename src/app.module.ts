import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { DocumentsModule } from './documents/documents.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from './roles/roles.module'
import { ModulesModule } from './modules/modules.module'
import { PermissionsModule } from './permissions/permissions.module'
import { RoleModulePermissionsModule } from './role_module_permissions/role_module_permissions.module'
import {
  Module as ModuleEntity,
  RoleModulePermission,
  User,
  Permission,
  Role,
  Document as DocumentEntity,
  TrackIngestion,
  IngestionData,
} from './entities'
import { JwtStrategy, JwtService } from '@app/common/jwt'
import { AbilityService } from './common/ability/casl-ability.service'
import { CaslGuard } from './common/ability/casl.guard'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration } from './configs/env.config'
import { IngestionModule } from './ingestion/ingestion.module'
import { ScheduleModule } from '@nestjs/schedule'
import { IngTrackSchedulerService } from './common/schedulers/ingestion.scheduler'
import { AxiosService } from './common/api'
import { PhotosApisService } from './common/api/photos.api'
import { SeederService } from './common/seeder.service'
import { UserService } from './user/user.service'
import { CryptoService } from './common/crypto/crypto.service'
import { RolesService } from './roles/roles.service'
import { WinstonLoggerService } from './common/logger/logger.service'
import { CacheModule } from './cache/cache.module'
import { CacheService } from './cache/cache.service'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { TodoModule } from './todo/todo.module'
import { ValidateDomainMiddleware } from './common/filters/validate-domains.filter'
import { TodoStatusModule } from './todo-status/todo-status.module'
import { ChatModule } from './chat/chat.module'
import { NotificationModule } from './notification/notification.module'
import { KafkaModule } from './kafka/kafka.module'
import { EncryptionMiddleware } from './common/encryption.middleware'
import { DecryptionMiddleware } from './common/decryption.middleware'
import { EncryptionService } from './common/crypto/encryption.service'

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

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: true, // Consider using migrations in production
        entities: [
          User,
          ModuleEntity,
          RoleModulePermission,
          Permission,
          Role,
          DocumentEntity,
          TrackIngestion,
          IngestionData,
        ],
        logging: configService.get<boolean>('database.debug'),
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([TrackIngestion, IngestionData, User, Role]),
    AuthModule,
    UserModule,
    DocumentsModule,
    RolesModule,
    ModulesModule,
    PermissionsModule,
    RoleModulePermissionsModule,
    IngestionModule,
    ScheduleModule.forRoot(),
    CacheModule,

    // Mongodb implementation
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access ConfigService
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('mongo_config.uri')}/${configService.get<string>('mongo_config.db')}`, // Load MongoDB URI dynamically
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),

    TodoModule,

    TodoStatusModule,

    ChatModule,

    NotificationModule,

    KafkaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    JwtStrategy,
    AbilityService,
    CaslGuard,
    IngTrackSchedulerService,
    AxiosService,
    PhotosApisService,
    UserService,
    CryptoService,
    RolesService,
    SeederService,
    WinstonLoggerService,
    CacheService,
    EncryptionService,
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
    consumer.apply(EncryptionMiddleware).forRoutes('*') // Apply encryption middleware if needed

    consumer.apply(DecryptionMiddleware).forRoutes('*') // Apply decryption middleware if needed

    consumer.apply(ValidateDomainMiddleware).forRoutes('*')
  }
}
