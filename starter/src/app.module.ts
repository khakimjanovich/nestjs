import { Module, ValidationPipe } from "@nestjs/common";
import { PermissionsModule } from "./permissions/permissions.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";

const settings = require("../ormconfig.js");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(settings),
    PermissionsModule,
    RolesModule,
    UsersModule,
    // AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }]
})
export class AppModule {
}
