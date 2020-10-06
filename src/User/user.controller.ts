/* eslint-disable @typescript-eslint/ban-types */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
// import { User } from '../model/user.model';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';


@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    // @Post()
    // create(@Body() user: User): Observable<User | Object> {
    //     return this.userService.create(user).pipe(
    //         map((user: User) => user),
    //         catchError(err => of({ error: err.message }))
    //     );
    // }

    // @Post('login')
    // login(@Body() user: User): Observable<Object> {
    //     return this.userService.login(user).pipe(
    //         map((jwt: string) => {
    //             return { access_token: jwt };
    //         })
    //     )
    // }
    @Get()
  @UseGuards(AuthGuard('jwt'))
  listOrders() {
    return "in user";
  }
}