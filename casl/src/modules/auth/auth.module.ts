import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import {CaslAbilityFactory} from "./casl-ability.factory";

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: 'process.env.APP_KEY',
        signOptions: {
            expiresIn: '360000s'
        }
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy,CaslAbilityFactory],
    exports:[AuthService]
})
export class AuthModule {
}