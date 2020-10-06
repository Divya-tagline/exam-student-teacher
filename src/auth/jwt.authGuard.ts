import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTOptionalGuard extends AuthGuard('jwt') {

  handleRequest(err, user) {
    return user;
  }

}