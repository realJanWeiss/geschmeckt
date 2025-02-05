import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserResponseDTO => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
