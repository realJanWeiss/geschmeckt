import { ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GetJwt } from './decorators/jwt.decorator';
import { Authguard } from '@/guards/auth.guard';
import { UserRequestDTO } from '@/users/dtos/request/user.request.dto';
import { LoginRequestDTO } from '@/users/dtos/request/login.request.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  @ApiOkResponse({
    description: 'Returns the JWT.',
    content: {
      'text/plain': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  public async register(@Body() body: UserRequestDTO): Promise<string> {
    return this.authenticationService.register(body);
  }

  @Post('/login')
  @HttpCode(200)
  public async login(@Body() body: LoginRequestDTO): Promise<string> {
    return this.authenticationService.login(body);
  }

  @Post('/logout')
  @UseGuards(Authguard)
  public async logout(@GetJwt() dto: { jwt: string }): Promise<boolean> {
    return this.authenticationService.logout(dto);
  }
}
