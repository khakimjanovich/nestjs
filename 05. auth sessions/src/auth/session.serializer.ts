import {PassportSerializer} from "@nestjs/passport";
import {User, UsersService} from "../users/users.service";

export class SessionSerializer extends PassportSerializer {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    deserializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user)
    }

    async serializeUser(payload: any, done: (err: Error, user: User) => void): Promise<any> {
        done(null, payload)
    }

}