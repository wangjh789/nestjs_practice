import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ItemController } from './controllers/item.controller';
import { ItemRepository } from './item.repository';
import { ItemService } from './services/item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository]),
    AuthModule,],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule { }
