import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {UsersModule} from "../modules/users/users.module";
import {ReportsModule} from "../modules/reports/reports.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "../modules/app.controller";
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";

const sessionCookie = require('cookie-session');
const settings = require('../../ormconfig.js');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        TypeOrmModule.forRoot(settings),
        UsersModule,
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true
            })
        }
    ],
})
export class AppModule {
    constructor(private configService: ConfigService) {
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(
            sessionCookie({
                keys: [
                    this.configService.get('COOKIE_KEY')
                ]
            })
        ).forRoutes('*');
    }
}
