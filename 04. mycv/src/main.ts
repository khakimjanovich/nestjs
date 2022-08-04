import {NestFactory} from '@nestjs/core';
import {AppModule} from './bootstrap/app.module';

const sessionCookie = require('cookie-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(3000);
}

bootstrap().then(r => console.log('App is running on: http://localhost:3000'));
