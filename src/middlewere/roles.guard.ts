import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //console.log("roles : ",roles);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    // console.log("user : "+user);

    if (user) {
      if (roles.indexOf(user.usertype) > -1) {
        //console.log("user type: "+user.userType);

        return true;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
