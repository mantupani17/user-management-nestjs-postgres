import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities';
import { AbilityService } from '@app/common/ability/casl-ability.service';
import { CaslGuard } from '@app/common/ability/casl.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, AbilityService, CaslGuard]
})
export class UserModule {}
