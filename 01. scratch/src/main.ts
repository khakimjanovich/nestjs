import {NestFactory} from "@nestjs/core";
import {AppModule} from "./bootstrap/app.module";


async function bootstrap() {
    const port = 5003;
    const app = await NestFactory.create(AppModule)
    await app.listen(port).then(r => console.log(`The app is running on the port: ${port}`))
}

bootstrap()