import {
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
  IsNotEmpty,
} from "class-validator";

// tslint:disable-next-line: max-classes-per-file
export class LoginForUser {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SignUpForUser {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  usertype: string;

  @IsEmail()
  emaiil: string
}
