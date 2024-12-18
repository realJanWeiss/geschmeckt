import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserRequestDTO } from 'src/users/dtos/request/user.request.dto';
import { password_validate } from 'src/users/password.utils';
import { AuthenticationError } from './errors';

@Injectable()
export class AuthenticationService {
  private blackListedJWTs: string[] = [];
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly JWTService: JwtService,
  ) {}

  public async register(userRequestDTO: UserRequestDTO): Promise<string> {
    const user = await this.usersService.createUser(userRequestDTO);
    return await this.JWTService.signAsync({ userID: user.id });
  }

  public async login(userRequestDTO: UserRequestDTO): Promise<string> {
    const userFromDB = await this.userRepository.findOneBy({
      email: userRequestDTO.email,
    });
    if (!userFromDB) throw new AuthenticationError();
    const isPasswordValid = await password_validate(
      userRequestDTO.password,
      userFromDB.password,
    );
    if (!isPasswordValid) throw new AuthenticationError();
    return await this.JWTService.signAsync({ userID: userFromDB.id });
  }

  public async logout(dto: { jwt: string }): Promise<boolean> {
    this.blackListedJWTs.push(dto.jwt);
    return true;
  }

  public getBlackListedJWTs(): string[] {
    return this.blackListedJWTs;
  }
}
