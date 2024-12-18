import { BadRequestException } from '@nestjs/common';

export class AuthenticationError extends BadRequestException {
  constructor() {
    super('Username or password incorrect');
  }
}
