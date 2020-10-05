import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "../model/student.model";
import { SubjectSchema } from "../model/subject.model";
import { QuestionSchema } from "../model/question.model";
import { ResultSchema } from "../model/result.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Student", schema: StudentSchema },
      { name: "Subject", schema: SubjectSchema },
      { name: "Result", schema: ResultSchema },
      { name: "Question", schema: QuestionSchema }
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
