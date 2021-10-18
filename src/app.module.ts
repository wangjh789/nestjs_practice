import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './config/typeorm.config';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
