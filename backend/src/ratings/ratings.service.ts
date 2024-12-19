import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { In, Repository } from 'typeorm';
import { GroupsService } from '@/groups/groups.service';
import { GroupNotFoundException } from '@/groups/errors';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,
    private readonly groupsService: GroupsService,
  ) {}

  async rate(userId: string, productId: string, rating: number): Promise<void> {
    const newRating = this.ratingsRepository.create({
      user: { id: userId },
      product: { id: productId },
      rating,
    });

    await this.ratingsRepository.save(newRating);
  }

  // TODO return RatingReturnDTO instead
  async getRatingByGroupByProduct(
    groupId: string,
    productId: string,
    userId: string,
  ): Promise<RatingEntity[]> {
    const group = await this.groupsService.getGroupEntity(groupId);

    if (!group.users.some((user) => user.id === userId)) {
      throw new GroupNotFoundException();
    }

    return await this.ratingsRepository.find({
      where: {
        product: { id: productId },
        user: In(group.users.map((u) => u.id)),
      },
    });
  }
}
