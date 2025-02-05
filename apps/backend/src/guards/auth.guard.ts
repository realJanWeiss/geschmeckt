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
    private readonly jwtService: JwtService,
    private readonly authService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const jwt = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verify(jwt);
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
