import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from "@nestjs/mongoose";
//import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../model/user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: "User", schema: UserSchema },
      ]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
