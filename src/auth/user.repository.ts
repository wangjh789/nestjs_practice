import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { SignUpUserDto } from "./dtos/signup-user.dto";
import { User } from "./models/user.entity";
import * as bcrypt from 'bcryptjs'


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(signUpUserDto: SignUpUserDto): Promise<void> {
        const { email, password } = signUpUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ ...signUpUserDto, password: hashedPassword })
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing email');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}