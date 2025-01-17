import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { UserEntity } from '@/users/entities/user.entity';
import { GetUser } from '@/authentication/decorators/user.decorator';
import { RequireAuth } from '@/authentication/decorators/require-auth.decorator';
import { RatingResponseDTO } from './dtos/response/rating.response.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RatingRequestDTO } from './dtos/request/rating.request.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('products/:productId')
  @RequireAuth()
  @ApiOkResponse({ type: RatingResponseDTO })
  public async rate(
    @Param('productId') productId: string,
    @Body() ratingRequestDTO: RatingRequestDTO,
    @GetUser() user: UserEntity,
  ): Promise<RatingResponseDTO> {
    return this.ratingsService.rate(
      user.id,
      productId,
      ratingRequestDTO.rating,
    );
  }

  @Get('products/:productId')
  @RequireAuth()
  @ApiOkResponse({ type: RatingResponseDTO })
  public async getRating(
    @Param('productId') productId: string,
    @GetUser() user: UserEntity,
  ): Promise<RatingResponseDTO> {
    return this.ratingsService.getRatingByUser(user.id, productId);
  }

  @Get('groups/:groupId/:productId')
  @RequireAuth()
  @ApiOkResponse({ type: [RatingResponseDTO] })
  public async getRatings(
    @Param('groupId') groupId: string,
    @Param('productId') productId: string,
    @GetUser() user: UserEntity,
  ): Promise<RatingResponseDTO[]> {
    return this.ratingsService.getRatingByGroupByProduct(
      groupId,
      productId,
      user.id,
    );
  }
}
