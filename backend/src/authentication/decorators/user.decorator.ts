import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): { user: UserEntity } => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
