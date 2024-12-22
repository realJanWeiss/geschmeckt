import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { UserRequestDTO } from '@/users/dtos/request/user.request.dto';
import { password_validate } from '@/users/password.utils';
import { AuthenticationError } from './errors';
import { LoginRequestDTO } from '@/users/dtos/request/login.request.dto';

@Injectable()
export class AuthenticationService {
  private readonly blackListedJWTs: string[] = [];

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

  public async login(loginRequestDTO: LoginRequestDTO): Promise<string> {
    const userFromDB = await this.userRepository.findOneBy({
      email: loginRequestDTO.email,
    });
    if (!userFromDB) throw new AuthenticationError();
    const isPasswordValid = await password_validate(
      loginRequestDTO.password,
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
