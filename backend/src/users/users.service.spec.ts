import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRequestDTO } from './dtos/request/user.request.dto';
import { BadRequestException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOneBy: jest.fn(),
  save: jest.fn(),
});

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    ) as unknown as ReturnType<typeof mockUserRepository>;
  });

  describe('createUser', () => {
    const createUserDto: UserRequestDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
    };

    const createdUser = new UserEntity(createUserDto.email);
    createdUser.id = '1';
    createdUser.name = createUserDto.name;

    it(`should create and return a user when user doesn't exist`, async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      userRepository.findOneBy.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(createdUser);

      const result = await service.createUser(createUserDto);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        name: createUserDto.name,
        email: createUserDto.email,
        password: 'hashedPassword',
      });

      expect(result).toEqual(createdUser);
    });

    it(`should throw BadRequestException when user already exists`, () => {
      userRepository.findOneBy.mockResolvedValue(createdUser);
      expect(service.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
