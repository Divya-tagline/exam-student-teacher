/* eslint-disable @typescript-eslint/ban-types */
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../middlewere/roles.decorator';
import { RolesGuard } from '../middlewere/roles.guard';
//import { AuthService } from "../auth/auth.service";
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService, //  private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.teacherService.getHello();
  }
  
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('Teacher')
  @Post('subjectadd')
  async addsubject(
    //@Body() newsubject: any
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.teacherService.insertsubject(req, res);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('Teacher')
  @Post('questionadd')
  async addquestion(
    //@Body() newqusetions: any
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const generatedId = await this.teacherService.insertquestions(req, res);
    return { generatedId };
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('Teacher')
  @Get('getallstudentresult')
  async getallstudentresult(@Res() res: Response) {
    const generatedId = await this.teacherService.getallstudentresult(res);
    return { generatedId };
  }
}
