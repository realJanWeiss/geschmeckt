import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEAN,
} from 'class-validator';

export class ProductBaseDTO {
  @ApiProperty()
  @IsEAN()
  ean: string;

  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty()
  createdAt: Date;
}
