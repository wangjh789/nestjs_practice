import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "src/auth/models/user.entity";
import { Item } from "../models/item.entity";
import { ItemService } from "../services/item.service";

@Injectable()
export class IsCreatorGuard implements CanActivate {
    constructor(
        private readonly itemService: ItemService,
    ) { }

    canActivate(
        context: ExecutionContext): Promise<boolean> | boolean {
        const request = context.switchToHttp().getRequest();

        const { user, params }: { user: User; params: { id: number } } = request;

        if (!user || !params) return false;
        if (user.role === 'admin') return true; //allow admins to get make requests

        const userId = user.id;
        const boardId = params.id;

        return this.itemService.findItemById(boardId).then((item: Item) => {
            const isAuthor = item.author.id === userId;
            return isAuthor;
        })
    }
}