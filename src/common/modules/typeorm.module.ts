import {
  Module as ModuleEntity,
  RoleModulePermission,
  User,
  Permission,
  Role,
  Client,
  // Document as DocumentEntity,
  // TrackIngestion,
  // IngestionData,
} from '@app/entities'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
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
          Client,
          // DocumentEntity,
          // TrackIngestion,
          // IngestionData,
        ],
        logging: configService.get<boolean>('database.debug'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeOrmConfigModule {}
