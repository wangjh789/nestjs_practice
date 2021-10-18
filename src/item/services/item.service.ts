import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.entity';
import { CreateItemDto } from '../dtos/create-item.dto';
import { ItemRepository } from '../item.repository';
import { Item } from '../models/item.entity';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemRepository)
        private readonly itemRepository: ItemRepository,
    ) { }

    createItem(user: User, createItemDto: CreateItemDto): Promise<Item> {
        return this.itemRepository.createItem(user, createItemDto)
    }

}
