import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwt = createParamDecorator(
  (data, context: ExecutionContext): { jwt: string } => {
    const request = context.switchToHttp().getRequest();
    return request.jwt;
  },
);
