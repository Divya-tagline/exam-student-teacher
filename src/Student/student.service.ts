import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';
//import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Subject } from '../model/subject.model';
import { Result } from '../model/result.model';
import { Question } from '../model/question.model';
//import { helper } from "../helper";
//const saltRounds = 10;
//import { Cron } from '@nestjs/schedule';
import { Cron, NestSchedule } from 'nest-schedule';
import * as nodemailer from 'nodemailer';
//let nodemailer = require('nodemailer');
//import config from '@nestjs/config';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divyaa.tagline@gmail.com',
    pass: 'tagline@123',
  },
});
@Injectable()
export class StudentService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    @InjectModel('Subject') private readonly SubjectModel: Model<Subject>,
    @InjectModel('Result') private readonly ResultModel: Model<Result>,
    @InjectModel('Question') private readonly QuestionModel: Model<Question>,
  ) {}
  @Cron('*1 * * * *')
  async cronJob(email, msg) {
    console.log('running a task every 2 hours(1 min)');
    const mailOptions = {
      from: 'divyaa.tagline@gmail.com',
      to: 'divyaa.tagline@gmail.com',
      subject: 'result',
      text: msg,
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent', info.response);
      }
    });
  }
  getHello(): string {
    return 'Hello Student!';
  }

  async takeexam(req: Request, res: Response) {
    try {
      const sub_id = req.body.sub_id;
      // const s_id = req.body.s_id;
      const covertInId = Types.ObjectId(sub_id);
      const defaultQuery = [
        { $match: { _id: covertInId } },
        {
          $lookup: {
            from: 'questions',
            localField: '_id',
            foreignField: 'sub_id',
            as: 'question_detail',
          },
        },
        { $unwind: '$question_detail' },
        {
          $project: {
            question: '$question_detail.q_name',
            option: '$question_detail.option',
          },
        },
      ];
      const result = await this.SubjectModel.aggregate(defaultQuery);
      console.log(result);

      return res.json({ statusCode: 200, message: 'Questions:', data: result });
    } catch (e) {
      console.log('error: ' + e);
      return res.json({
        statusCode: 500,
        message: 'Failed to takeexam',
        data: null,
      });
    }
  }

  async result(req: Request, res: Response) {
    const result = req.body;
    const qustionsans = result.qustionsans;
    const total = qustionsans.length;
    let mark = 0;
    for (let i = 0; i < total; i++) {
      const ans = qustionsans[i].ans;
      const question = await this.QuestionModel.findById(
        qustionsans[i].questionId,
      );
      if (question.answer == ans) {
        mark++;
      }
    }
    const persantage = (mark / total) * 100;
    const msg =
      `RESULT
            mark : ` +
      mark +
      `
            persantage: ` +
      persantage +
      `% `;
    const s_id = Types.ObjectId(result.s_id);
    const newresult = new this.ResultModel({
      s_id: s_id,
      sub_id: result.sub_id,
      result: mark,
      persantage: persantage,
    });
    newresult.save();
    res.json({
      statusCode: 200,
      message:
        'Your exam done. The exam result will be sent in email after 2 hours',
      data: {},
    });
    //const time = '*1 * * * *';
    const _id = Types.ObjectId(result.s_id);
    const email = await this.UserModel.findOne(_id);
    //const job = 
    this.cronJob(email, msg);
   // job.stop();
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      const decoded: any = await jwt.verify(token, 'Student_key');

      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
