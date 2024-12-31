import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { In, Repository } from 'typeorm';
import { GroupsService } from '@/groups/groups.service';
import { GroupNotFoundException } from '@/groups/errors';
import { RatingResponseDTO } from './dtos/response/rating.response.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingsRepository: Repository<RatingEntity>,
    private readonly groupsService: GroupsService,
  ) {}

  async getRatingByUser(
    userId: string,
    productId: string,
  ): Promise<RatingResponseDTO> {
    const rating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (!rating) {
      throw new NotFoundException();
    }
    return rating.mapToResponseDTO();
  }

  async rate(
    userId: string,
    productId: string,
    rating: number,
  ): Promise<RatingResponseDTO> {
    const newRating = this.ratingsRepository.create({
      user: { id: userId },
      product: { id: productId },
      rating,
    });

    await this.ratingsRepository.save(newRating);
    return newRating.mapToResponseDTO();
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
