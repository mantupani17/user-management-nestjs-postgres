import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@app/common/base.service';

@Injectable()
export class UserService extends BaseService{
    constructor(@InjectRepository(User) userRepository: Repository<User>, private readonly dataSource: DataSource){
        super(userRepository)
    }

    async getQueryBuilder(where, select, limit: any = 10, skip: any = 0, order: any = {"users.firstName": 'ASC'}) {
        const userRepository = this.dataSource.getRepository(User)
        const queryBuilder = await userRepository.createQueryBuilder('users')
        .where({status: 1, ...where})
        .orderBy(order)
        .limit(limit)
        .skip(skip)
        .leftJoin('users.role', 'roles')
        .select(select)
        .getMany();
        return queryBuilder
    }
}
