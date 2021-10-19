import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/models/user.entity";
import { EntityRepository, Repository, UpdateResult } from "typeorm";
import { CreateItemDto } from "./dtos/create-item.dto";
import { UpdateItemDto } from "./dtos/update-item.dto";
import { Item } from "./models/item.entity";


@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{

    async findItemById(id: number): Promise<Item> {
        const item = this.findOne({ id })
        if (!item) {
            throw new NotFoundException(`no item with id:${id}`)
        }
        return item;
    }

    async createItem(user: User, createItemDto: CreateItemDto): Promise<Item> {
        const tempUser = user;
        delete tempUser.password
        const item = this.create({
            ...createItemDto,
            author: tempUser
        })

        await this.save(item)
        return item;
    }

    async updateItem(itemId: number, updateItemDto: UpdateItemDto): Promise<UpdateResult> {
        const item = await this.findOne({ id: itemId })
        const updatedItem = { ...item, ...updateItemDto }
        return await this.update(itemId, updatedItem)

    }
}