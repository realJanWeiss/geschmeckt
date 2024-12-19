import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { UserEntity } from '@/users/entities/user.entity';
import { Authguard } from '@/guards/auth.guard';
import { GetUser } from '@/authentication/decorators/user.decorator';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('products/:productId')
  @UseGuards(Authguard)
  rate(
    @Param('productId') productId: string,
    @Body('rating') rating: number,
    @GetUser() user: UserEntity,
  ) {
    return this.ratingsService.rate(user.id, productId, rating);
  }

  @Get('groups/:groupId/:productId')
  @UseGuards(Authguard)
  public async getRatings(
    @Param('groupId') groupId: string,
    @Param('productId') productId: string,
    @GetUser() user: UserEntity,
  ) {
    return this.ratingsService.getRatingByGroupByProduct(
      groupId,
      productId,
      user.id,
    );
  }
}
