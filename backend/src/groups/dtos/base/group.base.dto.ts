import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { UserResponseDTO } from '@/users/dtos/response/user.request.dto';

export class GroupBaseDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @Length(1, 200)
  name: string;

  @ApiProperty()
  secret: string;

  @ApiProperty({ type: () => [UserResponseDTO], minItems: 1 })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => UserResponseDTO)
  @ValidateNested({ each: true })
  users: UserResponseDTO[];
}
