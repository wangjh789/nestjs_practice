import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './user.repository';

import * as config from 'config'
import { JwtStrategy } from './helpers/jwt.strategy';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])

  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
