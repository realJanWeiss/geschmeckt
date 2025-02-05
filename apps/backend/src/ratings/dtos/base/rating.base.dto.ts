import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class RatingBaseDTO {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  user: UserResponseDTO;
}
