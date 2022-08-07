import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() request) {
    return {
      message: "Looged In", //TODO: return a jwt access_token
      data: await this.authService.login(request.user)
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() request): {} {
    return {
      data: request.user // TODO: require a bearer token, validate token
    };
  }
}
