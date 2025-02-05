import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './ratings.service';
import { GroupNotFoundException } from '@/groups/errors';
import { RatingEntity } from './entities/rating.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupsService } from '@/groups/groups.service';

const mockGroupsService = () => ({
  getGroupEntity: jest.fn(),
});
const mockRatingRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('RatingsService', () => {
  let service: RatingsService;
  let groupsService: ReturnType<typeof mockGroupsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        { provide: GroupsService, useFactory: mockGroupsService },
        {
          provide: getRepositoryToken(RatingEntity),
          useFactory: mockRatingRepository,
        },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    groupsService = module.get(GroupsService);
  });

  describe('getRatingByGroupByProduct', () => {
    it('should throw a GroupNotFoundException if requesting user in not part of the group', () => {
      groupsService.getGroupEntity.mockResolvedValue({
        users: [{ id: 'differentUser' }],
      });
      expect(
        service.getRatingByGroupByProduct('userId', 'productId', 'userId'),
      ).rejects.toThrow(GroupNotFoundException);
    });
  });
});
