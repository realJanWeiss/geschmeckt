import { ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GetJwt } from './decorators/jwt.decorator';
import { UserRequestDTO } from '@/users/dtos/request/user.request.dto';
import { LoginRequestDTO } from '@/users/dtos/request/login.request.dto';
import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';
import { GetUser } from './decorators/user.decorator';
import { RequireAuth } from './decorators/require-auth.decorator';

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
  public async login(@Body() body: LoginRequestDTO): Promise<string> {
    return this.authenticationService.login(body);
  }

  @Post('/logout')
  @RequireAuth()
  public async logout(@GetJwt() dto: { jwt: string }): Promise<boolean> {
    return this.authenticationService.logout(dto);
  }

  @Get('/current')
  @RequireAuth()
  @ApiOkResponse({
    type: UserResponseDTO,
  })
  public async getCurrentUser(
    @GetUser() user: UserResponseDTO,
  ): Promise<UserResponseDTO> {
    return user;
  }
}
