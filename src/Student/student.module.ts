import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SubjectSchema } from "../model/subject.model";
import { QuestionSchema } from "../model/question.model";
import { ResultSchema } from "../model/result.model";
import { ScheduleModule } from 'nest-schedule';
import { UserSchema } from "src/model/user.model";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Subject", schema: SubjectSchema },
      { name: "Result", schema: ResultSchema },
      { name: "Question", schema: QuestionSchema }
    ]), ScheduleModule.register(),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
