import {  Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TeacherSchema } from "../model/teacher.model";
import { SubjectSchema } from "../model/subject.model";
import { QuestionSchema } from "../model/question.model";
import {StudentSchema} from "../model/student.model";
//import { AuthModule } from "src/auth/auth.module";
import {AuthModule} from "../auth/auth.module"
@Module({
  imports: [ AuthModule,
    MongooseModule.forFeature([
      { name: "Teacher", schema: TeacherSchema },
      { name: "Subject", schema: SubjectSchema },
      { name: "Question", schema: QuestionSchema },
      { name: "Student", schema: StudentSchema },
    ])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
