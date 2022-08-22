import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { scrypt as _scrypt } from "crypto";
import { RegisterDto } from "./dto/register.dto";
import { promisify } from "util";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const [user] = await this.usersService.findByEmail(email);

    console.log(user);
    if (!user) {
      return null;
    }

    const [salt, storedHash] = user.password.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString("hex")) {
      return null;
    }

    return user;
  }

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.create({ name, email, password });
    return this.login(user);
  }

  async login(user: User) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
