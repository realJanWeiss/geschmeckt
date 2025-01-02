import { PickType } from '@nestjs/swagger';
import { RatingBaseDTO } from '../base/rating.base.dto';

export class RatingResponseDTO extends PickType(RatingBaseDTO, [
  'rating',
  'user',
]) {}
