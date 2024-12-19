import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRequestDTO } from './dtos/request/user.request.dto';
import { BadRequestException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOneBy: jest.fn(),
  create: jest.fn(),
  insert: jest.fn(),
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
    userRepository = module.get<ReturnType<typeof mockUserRepository>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('createUser', () => {
    const createUserDto: UserRequestDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
    };

    it(`should create and return a user when user doesn't exist`, async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      userRepository.findOneBy.mockResolvedValue(null);
      const createdUser = new UserEntity(createUserDto.email);
      createdUser.name = createUserDto.name;
      createdUser.password = 'hashedPassword';
      userRepository.create.mockReturnValue(createdUser);
      userRepository.insert.mockImplementation(() => {
        createdUser.id = '1';
        return Promise.resolve({ identifiers: [{ id: '1' }] });
      });

      const result = await service.createUser(createUserDto);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(userRepository.insert).toHaveBeenCalledWith(createdUser);

      expect(result).toEqual({
        email: 'john@example.com',
        id: '1',
        name: 'John Doe',
      });
    });

    it(`should throw BadRequestException when user already exists`, () => {
      const existingUser = new UserEntity(createUserDto.email);
      userRepository.findOneBy.mockResolvedValue(existingUser);
      expect(service.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
