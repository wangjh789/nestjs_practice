import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInUserDto } from '../dtos/signin-user.dto';
import { SignUpUserDto } from '../dtos/signup-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    signup(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<void> {
        return this.authService.signup(signUpUserDto);
    }

    @Post('signin')
    signin(@Body(ValidationPipe) signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
        return this.authService.signin(signInUserDto)
    }
}
