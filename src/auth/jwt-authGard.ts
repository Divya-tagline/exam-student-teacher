import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-device') {

  handleRequest(err, user, info) {
    return user;
  }

}