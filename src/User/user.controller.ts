/* eslint-disable @typescript-eslint/ban-types */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { hasRoles } from 'src/auth/decorators/roles.decorator';
// import { JwtAuthGuard } from '../auth/jwt-authGard';
//import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { Pagination } from 'nestjs-typeorm-paginate';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import path = require('path');
// import { join } from 'path';
// import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }
}