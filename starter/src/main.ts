import { NestFactory } from "@nestjs/core";
import { AppModule } from "./bootstrap/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Request documentation")
    .setDescription(
      "There will be initial api documentation!"
    )
    .setVersion("1.0.0")
    .addTag("Starter")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(+process.env.APP_PORT);
}

bootstrap().then(() => {
  console.log(`App is running on: ${process.env.APP_URL}`);
});
