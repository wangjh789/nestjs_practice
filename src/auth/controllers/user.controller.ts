import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get(':id')
    findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findUserById(id);
    }



}
