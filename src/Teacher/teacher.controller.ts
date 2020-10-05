/* eslint-disable @typescript-eslint/ban-types */
import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../middlewere/roles.decorator";
import { RolesGuard } from "../middlewere/roles.guard";
//import { AuthService } from "../auth/auth.service";
@Controller("teacher")
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService //  private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.teacherService.getHello();
  }
  @Get("show")
  async getallteacher() {
    const teachers = await this.teacherService.getallteacher();
    return teachers;
  }
  @Post("signup")
  @UseGuards(AuthGuard("jwt-device"), RolesGuard)
  @Roles("Teacher")
  async addteacher(
    // @Body() newteacher: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.teacherService.insertteacher(req, res);
  }

  @Post("login")
  async login(
    //@Body() teacher: any
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.teacherService.teacherlogin(req, res);
  }

  @Post("subjectadd")
  async addsubject(
    //@Body() newsubject: any
    @Req() req: Request,
    @Res() res: Response
  ) {
    return await this.teacherService.insertsubject(req, res);
  }
  @Post("questionadd")
  async addquestion(
    //@Body() newqusetions: any
    @Req() req: Request,
    @Res() res: Response
  ) {
    const generatedId = await this.teacherService.insertquestions(req, res);
    return { generatedId };
  }

  @Get("getallstudentresult")
  async getallstudentresult(@Res() res: Response) {
    const generatedId = await this.teacherService.getallstudentresult(res);
    return { generatedId };
  }
}
