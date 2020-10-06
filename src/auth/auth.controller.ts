import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../User/user.service';
import { Payload } from '../types/payload';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LoginForUser } from './auth.validation';

@Controller('user')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) data: LoginForUser,
    @Body() userDTO: LoginDTO,
  ) {
    const user = await this.userService.findByLogin(userDTO);
    //  const token = await this.authService.signPayload(payload);

    const payload: Payload = {
      username: user.username,
      teacher: user.teacher,
    };
    const token = await this.authService.signPayload(payload);
    await this.userService.addtoken(token, user);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    return await this.userService.create(userDTO);
  }
}
