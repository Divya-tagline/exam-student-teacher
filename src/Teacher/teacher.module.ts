import {  Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { MongooseModule } from "@nestjs/mongoose";
//import { TeacherSchema } from "../model/teacher.model";
import { SubjectSchema } from "../model/subject.model";
import { QuestionSchema } from "../model/question.model";
//import {StudentSchema} from "../model/student.model";
//import {UserS}
//import { AuthModule } from "src/auth/auth.module";
import {AuthModule} from "../auth/auth.module"
import { UserSchema } from "src/model/user.model";
@Module({
  imports: [ AuthModule,
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Subject", schema: SubjectSchema },
      { name: "Question", schema: QuestionSchema },
    ])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
