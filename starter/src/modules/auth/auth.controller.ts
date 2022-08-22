import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


  @ApiOperation({ summary: "Registering a new user!" })
  @ApiOkResponse({
    schema: {
      example: {
        access_token: "sometokenstring"
      }
    }
  })
  @Post("/register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: "Logging in an existing user!" })
  @ApiOkResponse({
    schema: {
      example: {
        access_token: "sometokenstring"
      }
    }
  })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Request() request) {
    return request.user;
  }
}
