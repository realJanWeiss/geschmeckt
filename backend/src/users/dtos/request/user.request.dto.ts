import { IsStrongPassword } from 'class-validator';
import { UserBaseDTO } from '../base/user.base.dto';
import { PickType } from '@nestjs/swagger';

export class UserRequestDTO extends PickType(UserBaseDTO, ['email'] as const) {
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
