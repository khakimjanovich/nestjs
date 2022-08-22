import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { PermissionsModule } from "../modules/permissions/permissions.module";
import { RolesModule } from "../modules/roles/roles.module";
import { UsersModule } from "../modules/users/users.module";
import { AuthModule } from "../modules/auth/auth.module";
import { ActivitiesModule } from "../modules/activities/activities.module";

const settings = require("../../ormconfig.js");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot(settings),
    PermissionsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    ActivitiesModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      skipMissingProperties: false,
      whitelist: true,
      transform: true,
      validationError: {
        target: true
      }
    })
  }]
})
export class AppModule {
}
