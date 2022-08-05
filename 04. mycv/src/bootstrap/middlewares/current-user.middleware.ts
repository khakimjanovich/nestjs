import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {UsersService} from "../../modules/users/users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session || {}
        if (userId) {
            // @ts-ignore
            req.currentUser = await this.usersService.findOneById(userId);
        }

        next()
    }

}