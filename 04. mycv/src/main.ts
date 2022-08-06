import {NestFactory} from '@nestjs/core';
import {AppModule} from './bootstrap/app.module';
import * as process from "process";

const sessionCookie = require('cookie-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(process.env.APP_PORT || 3000);
}

bootstrap().then(r => console.log('App is running on: http://localhost:3000'));
