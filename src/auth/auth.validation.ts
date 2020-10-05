import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsNumber,
  IsPhoneNumber,
  IsNotEmpty,
} from "class-validator";
export class LoginforUser {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class SignupforUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class TakeExam {

}
