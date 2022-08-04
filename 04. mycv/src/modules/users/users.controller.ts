import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {Serialize} from "../../bootstrap/interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";
import {CurrentUser} from "./decorators/current-user.decorator";
import {User} from "./user.entity";
import {AuthGuard} from "../../bootstrap/guards/auth.guard";

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    me(@CurrentUser() user: User) {
        return user;
    }

    @Post('/register')
    async register(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.register(body.email, body.password);
        session.userId = user.id
        return user;
    }

    @Post('/login')
    async login(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.login(body.email, body.password)
        session.userId = user.id
        return user;
    }

    @Post('/logout')
    logout(@Session() session: any) {
        session.userId = undefined;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.findAllByEmail(email)
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOneById(parseInt(id))
    }


    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }
}
