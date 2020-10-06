import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middlewere/roles.guard';
import { Roles } from 'src/middlewere/roles.decorator';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.studentService.getHello();
  }
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('Student')
  @Post('takeexam')
  async takeexam(@Req() req: Request, @Res() res: Response) {
    return await this.studentService.takeexam(req, res);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('Student')
  @Post('result')
  async result(@Req() req: Request, @Res() res: Response) {
    return await this.studentService.result(req, res);
  }
}
