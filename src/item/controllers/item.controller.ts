import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/helpers/get-user.decorator';
import { User } from 'src/auth/models/user.entity';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Item } from '../models/item.entity';
import { ItemService } from '../services/item.service';

@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
    ) { };

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createItem(@GetUser() user: User, @Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.createItem(user, createItemDto)
    }
}
