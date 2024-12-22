import { UserBaseDTO } from '../base/user.base.dto';
import { PickType } from '@nestjs/swagger';

export class LoginRequestDTO extends PickType(UserBaseDTO, [
  'email',
  'password',
] as const) {}
