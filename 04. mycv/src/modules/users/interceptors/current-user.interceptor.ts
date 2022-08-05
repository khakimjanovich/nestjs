import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {UsersService} from "../users.service";
import {User} from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {
    }

    async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {}

        if (userId) {
            request.currentUser = await this.usersService.findOneById(userId);
        }

        return handler.handle();
    }

}