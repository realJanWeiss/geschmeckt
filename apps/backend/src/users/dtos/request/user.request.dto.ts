import { UserBaseDTO } from '../base/user.base.dto';
import { PickType } from '@nestjs/swagger';

export class UserRequestDTO extends PickType(UserBaseDTO, [
  'name',
  'email',
  'password',
] as const) {}
