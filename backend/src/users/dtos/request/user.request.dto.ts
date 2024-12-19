import { IsStrongPassword } from 'class-validator';
import { UserBaseDTO } from '../base/user.base.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class UserRequestDTO extends PickType(UserBaseDTO, [
  'name',
  'email',
] as const) {
  @ApiProperty({ minLength: 8, example: 'Password123!' })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
