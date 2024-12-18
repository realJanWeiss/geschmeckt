import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class Authguard implements CanActivate {
  constructor(
    private readonly JWTService: JwtService,
    private readonly authService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const bearer = request.headers.authorization;
      if (!bearer) throw new UnauthorizedException();
      const jwt = bearer.split(' ')[1];
      const payload = await this.JWTService.verify(jwt);
      if (this.authService.getBlackListedJWTs().includes(jwt))
        throw new UnauthorizedException();
      request.jwt = { jwt };
      request.user = await this.usersService.getUserById(payload.userID);

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
