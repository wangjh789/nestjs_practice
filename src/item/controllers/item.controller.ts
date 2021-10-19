import { Body, Controller, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/helpers/get-user.decorator';
import { User } from 'src/auth/models/user.entity';
import { UpdateResult } from 'typeorm';
import { CreateItemDto } from '../dtos/create-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { IsCreatorGuard } from '../helpers/is-creator.guard';
import { Item } from '../models/item.entity';
import { ItemService } from '../services/item.service';

@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
    ) { };

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    createItem(@GetUser() user: User, @Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.createItem(user, createItemDto)
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard('jwt'), IsCreatorGuard)
    updateItem(@Param('id') itemId: number, @Body() updateItemDto: UpdateItemDto): Promise<UpdateResult> {
        return this.itemService.updateItem(itemId, updateItemDto)
    }
}
