import { Controller } from "@nestjs/common";

//import { TeacherService } from '../Teacher/teacher.service';
//import { Payload } from '../types/payload';
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    //private teacherService: TeacherService,
    private authService: AuthService
  ) {}

  /*
  @Post('register')
  async register(@Body() teacher: any) {
   /* const user = await this.teacherService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };*/
  //}
}
