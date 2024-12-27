import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRequestDTO } from './dtos/request/user.request.dto';
import { password_hash } from './password.utils';
import { UserResponseDTO } from './dtos/response/user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(user: UserRequestDTO): Promise<UserResponseDTO> {
    const foundUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (foundUser) {
      throw new BadRequestException('The E-mail address already has a user.');
    }
    const userEntity = this.userRepository.create({
      ...user,
      password: await password_hash(user.password),
    });
    await this.userRepository.insert(userEntity);
    return userEntity.mapToResponseDTO();
  }

  async getUserEntityById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getUserById(id: string): Promise<UserResponseDTO> {
    return (await this.getUserEntityById(id)).mapToResponseDTO();
  }

  public async deleteUserById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
