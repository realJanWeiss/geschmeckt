import { IsEmail, IsUUID } from 'class-validator';

export class UserBaseDTO {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;
}
