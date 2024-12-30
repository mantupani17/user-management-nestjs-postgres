import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy, JwtAuthGuard, JwtService } from '@app/common/jwt'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { CaslGuard } from '@app/common/ability/casl.guard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModulePermission, User } from '@app/entities'
import { CryptoService } from '@app/common/crypto/crypto.service'
import { RoleModulePermissionsService } from '@app/role_module_permissions/role_module_permissions.service'
import { EmailService } from '@app/common/email.service'
import { CacheService } from '@app/cache/cache.service'
import { CacheModule } from '@app/cache/cache.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RoleModulePermission]),
    CacheModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    JwtAuthGuard,
    AbilityService,
    CaslGuard,
    CryptoService,
    RoleModulePermissionsService,
    EmailService,
    CacheService,
  ],
})
export class AuthModule {}
