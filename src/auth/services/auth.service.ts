import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInUserDto } from '../dtos/signin-user.dto';
import { SignUpUserDto } from '../dtos/signup-user.dto';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    signup(signUpUserDto: SignUpUserDto): Promise<void> {
        return this.userRepository.createUser(signUpUserDto)
    }

    async signin(signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
        const { email, password } = signInUserDto;
        const user = await this.userRepository.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { email };
            const accessToken = await this.jwtService.sign(payload)

            return { accessToken }
        } else {
            throw new UnauthorizedException('login failed');
        }

    }
}
