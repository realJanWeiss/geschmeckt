import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserBaseDTO } from './dtos/base/user.base.dto';
import { UserRequestDTO } from './dtos/request/user.request.dto';
import { password_genSalt, password_hash } from './password.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(user: UserRequestDTO): Promise<UserBaseDTO> {
    const foundUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (foundUser) {
      throw new BadRequestException('The E-mail address already has a user.');
    }
    return await this.userRepository.save({
      email: user.email,
      password: await password_hash(user.password, await password_genSalt()),
    });
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async deleteUserById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
