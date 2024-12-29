import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GroupEntity } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { GroupRequestDTO } from './dtos/request/group.request.dto';
import { UsersService } from '@/users/users.service';
import { GroupResponseDTO } from './dtos/response/group.response.dto';
import { GroupNotFoundException } from './errors';
import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
  ) {}

  async getGroupEntity(groupId: string): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new GroupNotFoundException();
    }
    return group;
  }

  async getGroup(groupId: string): Promise<GroupResponseDTO> {
    return (await this.getGroupEntity(groupId)).mapToResponseDTO();
  }

  async getGroupsByUser(user: UserResponseDTO): Promise<GroupResponseDTO[]> {
    const groups = await this.groupRepository.find({ where: { users: user } });
    return groups.map((group) => group.mapToResponseDTO());
  }

  async createGroup(
    groupRequestDTO: GroupRequestDTO,
    userId: string,
  ): Promise<GroupResponseDTO> {
    const user = await this.usersService.getUserById(userId);

    const group = this.groupRepository.create({
      name: groupRequestDTO.name,
      users: [user],
    });
    await this.groupRepository.save(group);
    return group.mapToResponseDTO();
  }

  async deleteGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    if (group.users.some((user) => user.id === userId)) {
      throw new BadRequestException('User not in group');
    }
    await this.groupRepository.delete(groupId);
  }

  async addUserToGroup(
    userId: string,
    groupId: string,
  ): Promise<GroupResponseDTO> {
    const user = await this.usersService.getUserEntityById(userId);
    const group = await this.getGroupEntity(groupId);

    group.users.push(user);
    await this.groupRepository.save(group);
    return group.mapToResponseDTO();
  }

  async removeUserFromGroup(
    userId: string,
    groupId: string,
  ): Promise<GroupResponseDTO> {
    const user = await this.usersService.getUserEntityById(userId);
    const group = await this.getGroupEntity(groupId);

    const foundIndex = group.users.findIndex((u) => u.id === user.id);
    group.users.splice(foundIndex);
    await this.groupRepository.save(group);
    return group.mapToResponseDTO();
  }
}
