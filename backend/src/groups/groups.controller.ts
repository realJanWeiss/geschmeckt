import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Authguard } from '@/guards/auth.guard';
import { GroupRequestDTO } from './dtos/request/group.request.dto';
import { GroupsService } from './groups.service';
import { GetUser } from '@/authentication/decorators/user.decorator';
import { UserEntity } from '@/users/entities/user.entity';
import { GroupResponseDTO } from './dtos/response/group.response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @UseGuards(Authguard)
  @ApiOkResponse({ type: GroupResponseDTO })
  public async create(
    @Body() body: GroupRequestDTO,
    @GetUser() user: UserEntity,
  ): Promise<GroupResponseDTO> {
    return this.groupsService.createGroup(body, user.id);
  }

  @Delete('/:groupId')
  @UseGuards(Authguard)
  public async delete(
    @Param('groupId') groupId: string,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.groupsService.deleteGroup(groupId, user.id);
  }
}
