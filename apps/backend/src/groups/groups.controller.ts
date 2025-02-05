import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupRequestDTO } from './dtos/request/group.request.dto';
import { GroupsService } from './groups.service';
import { GetUser } from '@/authentication/decorators/user.decorator';
import { UserEntity } from '@/users/entities/user.entity';
import { GroupResponseDTO } from './dtos/response/group.response.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RequireAuth } from '@/authentication/decorators/require-auth.decorator';
import { UserResponseDTO } from '@/users/dtos/response/user.response.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('/by-user/current')
  @RequireAuth()
  @ApiOkResponse({ type: [GroupResponseDTO] })
  public async getGroupsForCurrentUser(
    @GetUser() user: UserResponseDTO,
  ): Promise<GroupResponseDTO[]> {
    return this.groupsService.getGroupsByUser(user);
  }

  @Get('/:groupId')
  @ApiOkResponse({ type: GroupResponseDTO })
  public async getGroupById(
    @Param('groupId') groupId: string,
  ): Promise<GroupResponseDTO> {
    return this.groupsService.getGroup(groupId);
  }

  @Post()
  @RequireAuth()
  @ApiOkResponse({ type: GroupResponseDTO })
  public async create(
    @Body() body: GroupRequestDTO,
    @GetUser() user: UserEntity,
  ): Promise<GroupResponseDTO> {
    return this.groupsService.createGroup(body, user.id);
  }

  @Delete('/:groupId')
  @RequireAuth()
  public async delete(
    @Param('groupId') groupId: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.groupsService.deleteGroup(groupId, user.id);
  }

  @Post('/:groupId/join')
  @RequireAuth()
  @ApiOkResponse({ type: GroupResponseDTO })
  public async join(
    @Param('groupId') groupId: string,
    @GetUser() user: UserEntity,
  ): Promise<GroupResponseDTO> {
    return this.groupsService.addUserToGroup(user.id, groupId);
  }

  @Post('/:groupId/leave')
  @RequireAuth()
  @ApiOkResponse({ type: GroupResponseDTO })
  public async leave(
    @Param('groupId') groupId: string,
    @GetUser() user: UserEntity,
  ): Promise<GroupResponseDTO> {
    return this.groupsService.removeUserFromGroup(user.id, groupId);
  }
}
