import { UserBaseDTO } from '../base/user.base.dto';
import { PickType } from '@nestjs/swagger';

export class UserResponseDTO extends PickType(UserBaseDTO, [
  'id',
  'name',
  'email',
] as const) {}
