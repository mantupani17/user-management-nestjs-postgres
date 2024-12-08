import { Module } from '@nestjs/common'
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
import { JwtStrategy, JwtAuthGuard, JwtService } from '@app/common/jwt'
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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Make the environment variables globally accessible in the app
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    JwtStrategy,
    JwtAuthGuard,
    AbilityService,
    CaslGuard,
    IngTrackSchedulerService,
    AxiosService,
    PhotosApisService,
    UserService,
    CryptoService,
    RolesService,
    SeederService,
  ],
})
export class AppModule {}
