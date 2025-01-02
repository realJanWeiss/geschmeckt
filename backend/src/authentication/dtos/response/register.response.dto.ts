import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDTO {
  @ApiProperty()
  user: UserResponseDTO;

  @ApiProperty()
  jwt: string;
}
