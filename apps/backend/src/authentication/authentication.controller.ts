import { ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GetJwt } from './decorators/jwt.decorator';
import { UserRequestDTO } from '@/users/dtos/request/user.request.dto';
import { LoginRequestDTO } from '@/users/dtos/request/login.request.dto';
import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';
import { GetUser } from './decorators/user.decorator';
import { RequireAuth } from './decorators/require-auth.decorator';
import { RegisterResponseDTO } from './dtos/response/register.response.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  @ApiOkResponse({
    description: 'Returns the JWT.',
    type: RegisterResponseDTO,
  })
  public register(@Body() body: UserRequestDTO): Promise<RegisterResponseDTO> {
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
  public login(@Body() body: LoginRequestDTO): Promise<string> {
    return this.authenticationService.login(body);
  }

  @Post('/logout')
  @RequireAuth()
  @ApiOkResponse({
    content: {
      'text/plain': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  public logout(@GetJwt() dto: { jwt: string }) {
    this.authenticationService.logout(dto);
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
