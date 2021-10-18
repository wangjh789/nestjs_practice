import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const user = this.create({ ...authCredentialsDto })
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