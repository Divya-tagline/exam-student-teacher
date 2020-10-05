
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],+-
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy ],
    exports: [AuthService]
})
export class AuthModule { }

/*import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentModule } from "./Student/student.module";
import { TeacherModule } from "./Teacher/teacher.module";
import { MongooseModule } from '@nestjs/mongoose';
//import {AuthModule} from "./auth/auth.module";


@Module({
  imports: [TeacherModule, StudentModule,MongooseModule.forRoot(
    "mongodb://localhost/project")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}*/
