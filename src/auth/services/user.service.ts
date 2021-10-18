import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { User } from '../models/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ id })
        if (user) {
            delete user.password;
            return user;
        } else {
            throw new NotFoundException(`no user with id:${id}`)
        }
    }



}
