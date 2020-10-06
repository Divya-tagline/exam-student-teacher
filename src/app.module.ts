import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './User/user.module';
import { StudentModule } from './Student/student.module';
import { TeacherModule } from './Teacher/teacher.module';
//import { SharedModule } from './shared/shared.module';
//import { ProductModule } from './product/product.module';
//import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/test'),
    AuthModule,
    UserModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
