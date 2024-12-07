import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UpdateUserPayload } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { PartialQueryOptions } from '@app/common/dtos/query.dto';
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard';
import { CaslGuard } from '@app/common/ability/casl.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, CaslGuard)
export class UserController {
    constructor(private readonly userService: UserService){}

    @Put('/:id')
    updateById(@Body() payload: UpdateUserPayload, @Param('id') id: number){
        return this.userService.update(id, payload)
    }

    @Get('list')
    findAll(@Query() q: PartialQueryOptions) {
        const { limit, skip, order, select } = q
        return this.userService.getQueryBuilder({}, [ 'users.email', 'users.mobile', 'users.username', 'users.firstName', 'users.lastName', 'users.id', 'roles.role', 'roles.id' ], limit, skip, order )
        // return this.userService.findAll({}, select, limit, skip, order );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
