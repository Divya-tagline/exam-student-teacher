import { Module, forwardRef } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-authGard';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

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
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy ],
    exports: [AuthService]
})

export class AuthModule { }
// import {  Module } from '@nestjs/common';
// //import { JwtModule } from '@nestjs/jwt';
// //import { TeacherModule } from '../Teacher/teacher.module';
// //import {StudentModule} from '../Student/student.module';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
// import { PassportModule } from '@nestjs/passport';
//  @Module({
//   imports: [ PassportModule],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
// })
// export class AuthModule {}