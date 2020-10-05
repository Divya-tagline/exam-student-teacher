import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Teacher } from "../model/teacher.model";
import { Subject } from "../model/subject.model";
import { Question } from "../model/question.model";
import { Student } from "../model/student.model";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
//import * as jwt from "jsonwebtoken";
const saltRounds = 10;
@Injectable()
export class TeacherService {
  constructor(
    @InjectModel("Teacher") private readonly TeacherModel: Model<Teacher>,
    @InjectModel("Subject") private readonly SubjectModel: Model<Subject>,
    @InjectModel("Question") private readonly QuestionModel: Model<Question>,
    @InjectModel("Student") private readonly StudentModel: Model<Student>
  ) {}
  getHello(): string {
    return "Hello Teacher!";
  }

  async insertteacher(req: Request, res: Response) {
    try {
      const teacher = req.body;
      const email = await this.TeacherModel.findOne({ email: teacher.email });
      if (email) {
        // return  as string;
        return res.json({
          statusCode: 400,
          message: "email already use",
          data: null,
        });
      } else {
        const hash = bcrypt.hashSync(teacher.password, saltRounds);
        const newTeacher = new this.TeacherModel({
          name: teacher.name,
          password: hash,
          email: teacher.email,
        });

        const result = await newTeacher.save();
        return res.json({
          statusCode: 200,
          message: "Teacher signup successfully.",
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

  async insertquestions(req: Request, res: Response) {
    try {
      const questions = req.body;
      console.log(questions);

      const result = await this.QuestionModel.insertMany(questions);
      console.log(result);

      return res.json({
        statusCode: 200,
        message: "Question added ",
        data: result,
      });
    } catch (error) {
      console.log("error: " + error);
      return res.json({
        statusCode: 500,
        message: "Failed to add question",
        data: null,
      });
    }
  }

  async insertsubject(req: Request, res: Response) {
    try {
      const subject = req.body;
      const subjectname = this.SubjectModel.findOne({
        name: subject.email,
      }).exec();
      if (subjectname) {
        return res.json({
          statusCode: 400,
          message: "Subject already added",
          data: null,
        });
      } else {
        const newSubject = new this.SubjectModel({
          name: subject.name,
        });
        const result = await newSubject.save();
        return res.json({
          statusCode: 200,
          message: "Subject added ",
          data: result,
        });
      }
    } catch (e) {
      console.log(e);
      return res.json({
        statusCode: 500,
        message: "Failed to add subject",
        data: null,
      });
    }
  }

  async getallteacher() {
    const teachers = await this.TeacherModel.find().exec();
    return teachers;
  }
  async teacherlogin(req: Request, res: Response) {
    try {
      const payload = req.body;
      const teacher = await this.TeacherModel.findOne({
        email: payload.email,
      }).exec();

      if (teacher && bcrypt.compareSync(payload.password, teacher.password)) {
        const token = sign(payload, "Teacher_key", { expiresIn: "12h" });
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
      console.log("error : " + e);
      return res.json({
        statusCode: 500,
        message: "Login error",
        data: null,
        error: e,
      });
    }
  }
  async findByPayload(payload: any) {
    const { username } = payload;
    return await this.TeacherModel.findOne({name : username });
  }

  async getallstudentresult(res: Response) {
    const query = {
      $lookup: {
        from: "results",
        localField: "_id",
        foreignField: "s_id",
        as: "student_result",
      },
    };
    const student_result = await this.StudentModel.aggregate([query]);
    for (let i = 0; i < student_result.length; i++) {
      const studentResults = student_result[i].student_result;
      console.log("studentResults:= ", studentResults);

      const total = studentResults.length;
      let per = 0;
      for (let j = 0; j < total; j++) {
        per += studentResults[j].persantage;
      }
      const result = per / total;
      console.log("result", result);
      if (!studentResults[i]) {
        continue;
      }
      await this.StudentModel.findByIdAndUpdate(studentResults[0].s_id, {
        result: result,
      });
    }
    // eslint-disable-next-line prefer-const
    let result = [];
    const students = await this.StudentModel.find().lean();
    students.map((sInfo) => {
      if (!sInfo.result) sInfo.result = 0;
      const message = { Name: sInfo.name, Result: sInfo.result };
      result.push(message);
    });
    return res.json(result);
  }
}
