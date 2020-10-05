import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "../model/student.model";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Subject } from "../model/subject.model";
import {Result} from "../model/result.model"
import { Question } from "../model/question.model";
//import { helper } from "../helper";
const saltRounds = 10;
@Injectable()
export class StudentService {
  constructor(
    @InjectModel("Student") private readonly StudentModel: Model<Student>,
    @InjectModel("Subject") private readonly SubjectModel: Model<Subject>,
    @InjectModel("Result") private readonly ResultModel: Model<Result>,
    @InjectModel("Question") private readonly QuestionModel: Model<Question>

  ) {}
  getHello(): string {
    return "Hello Student!";
  }
  async insertstudent(req: Request, res: Response) {
    try {
      const student = req.body;
      const email = await this.StudentModel.findOne({ email: student.email });
      if (email) {
        return res.json({
          statusCode: 400,
          message: "email already use",
          data: null,
        });
      } else {
        const hash = bcrypt.hashSync(student.password, saltRounds);
        const newStudent = new this.StudentModel({
          name: student.name,
          password: hash,
          email: student.email,
        });

        const result = await newStudent.save();
        return res.json({
          statusCode: 200,
          message: "Student signup successfully.",
          data: result,
        });
      }
    } catch (e) {
      console.log("error : ", e);
      return res.json({
        statusCode: 500,
        message: "Failed to Signup.",
        data: null,
      });
    }
  }

  async getallstudent() {
    const students = await this.StudentModel.find().exec();
    return students;
  }
  async studentlogin(req: Request, res: Response) {
    try {
      const payload = req.body;
      const student = await this.StudentModel.findOne({
        email: payload.email,
      }).exec();
      if (student && bcrypt.compareSync(payload.password, student.password)) {
        const token = sign(payload, "Student_key", { expiresIn: "12h" });
        return res.json({
          statusCode: 500,
          message: "Login successfully",
          token: token,
        });
      } else {
        return res.json({
          statusCode: 500,
          message: "Invalid password and email",
          data: null,
        });
      }
    } catch (e) {
      console.log("error: " + e);

      return res.json({
        statusCode: 500,
        message: "Failed to login.",
        data: null,
      });
    }
  }

  async takeexam(req: Request, res: Response) {
    try {
      const sub_id = req.body.sub_id;
      const covertInId = Types.ObjectId(sub_id);
      const defaultQuery = [
        { $match: { _id: covertInId } },
        {
          $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: "sub_id",
            as: "question_detail",
          },
        },
        { $unwind: "$question_detail" },
        {
          $project: {
            question: "$question_detail.q_name",
            option: "$question_detail.option",
          },
        },
      ];
      const result = await this.SubjectModel.aggregate(defaultQuery);
      console.log(result);

      return res.json({ statusCode: 200, message: "Questions:", data: result });
    } catch (e) {
      console.log("error: " + e);
      return res.json({
        statusCode: 500,
        message: "Failed to takeexam",
        data: null,
      });
    }
  }

  async result(req: Request, res: Response) {
    const result = req.body;
    const qustionsans = result.qustionsans;
    const total = qustionsans.length;
    let mark = 0;
    console.log("qustionsans: "+qustionsans);
    
    for (let i = 0; i < total; i++) {
      const ans = qustionsans[i].ans;
      console.log("qustionsans[i]: "+qustionsans[i]);
      
     const question =  await this.QuestionModel.findById(qustionsans[i].questionId);
        if (question.answer == ans) {
          mark++;
        }
    }
    const persantage = (mark / total) * 100;
   /* const msg =
      `RESULT
            mark : ` +
      mark +
      `
            persantage: ` +
      persantage +
      `% `;*/
    const newresult = new this.ResultModel({
     s_id: result.s_id,
      sub_id: result.sub_id,
      result: mark,
      persantage: persantage,
    });
    newresult.save();
    res.json({statusCode : 200,message : "Your exam done. The exam result will be sent in email after 2 hours" });
  //  const time = "*/1 * * * *";
   // helper.cron("divyaa.tagline@gmail.com", msg, time);
  }

  async validateToken(auth: string) {
    if (auth.split(" ")[0] !== "Bearer") {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(" ")[1];

    try {
      const decoded: any = await jwt.verify(token, "Student_key");

      return decoded;
    } catch (err) {
      const message = "Token error: " + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
