import { User } from "src/auth/models/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateItemDto } from "./dtos/create-item.dto";
import { Item } from "./models/item.entity";


@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{

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
}