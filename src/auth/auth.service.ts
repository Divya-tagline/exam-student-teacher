import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { TeacherService } from "../Teacher/teacher.service";
@Injectable()
export class AuthService {
  constructor(private userService: TeacherService) {}

  async signPayload(payload: any) {
    return sign(payload, "USERKEY", { expiresIn: "12h" });
  }
  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
