import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {UsersModule} from "../modules/users/users.module";
import {ReportsModule} from "../modules/reports/reports.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../modules/users/user.entity";
import {Report} from "../modules/reports/report.entity";
import {AppController} from "../modules/app.controller";
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {config} from "rxjs";

const sessionCookie = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        UsersModule,
        ReportsModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: "sqlite",
                    database: config.get<string>('DB_NAME'),
                    synchronize: true,
                    entities: [User, Report],
                }
            }
        })
        // TypeOrmModule.forRoot({
        //     type: 'sqlite',
        //     database: 'db.sqlite',
        //     entities: [User, Report],
        //     synchronize: true,
        // }),
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
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(
            sessionCookie({
                keys: ['randomNumbers99']
            })
        ).forRoutes('*');
    }
}
