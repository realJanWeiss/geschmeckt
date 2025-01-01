import { PickType } from '@nestjs/swagger';
import { RatingBaseDTO } from '../base/rating.base.dto';

export class RatingRequestDTO extends PickType(RatingBaseDTO, ['rating']) {}
