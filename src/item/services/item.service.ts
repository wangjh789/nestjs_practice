import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.entity';
import { UpdateResult } from 'typeorm';
import { CreateItemDto } from '../dtos/create-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { ItemRepository } from '../item.repository';
import { Item } from '../models/item.entity';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemRepository)
        private readonly itemRepository: ItemRepository,
    ) { }

    findItemById(id: number): Promise<Item> {
        return this.itemRepository.findItemById(id)
    }

    createItem(user: User, createItemDto: CreateItemDto): Promise<Item> {
        return this.itemRepository.createItem(user, createItemDto)
    }

    updateItem(itemId: number, updateItemDto: UpdateItemDto): Promise<UpdateResult> {
        return this.itemRepository.updateItem(itemId, updateItemDto)
    }

}
