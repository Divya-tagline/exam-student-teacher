import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Request, Response } from "express";

@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getHello(): string {
    return this.studentService.getHello();
  }

  @Post("signup")
  async addstudent(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.studentService.insertstudent(req, res);
  }
  @Post("login")
  async login(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.studentService.studentlogin(req, res);
  }
  @Post("takeexam")
  async takeexam(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.studentService.takeexam(req, res);
  }

  @Post("result")
  async result(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.studentService.result(req, res);
  }

  @Post("token")
  async token(@Body() token: any) {
    console.log(token.token);
    try {
      console.log(token.token);
      const t = await this.studentService.validateToken(token.token);
      return t;
    } catch (e) {
      return e;
    }
  }
}
