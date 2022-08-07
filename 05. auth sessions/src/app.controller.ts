import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthenticatedGuard} from "./auth/authenticated.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() request): {} {
        return {
            message: 'Looged In',
            data: request.user
        };
    }


    @UseGuards(AuthenticatedGuard)
    @Get()
    getHello(@Request() request): {} {
        return {
            data: request.user
        };
    }
}
