import { PickType } from '@nestjs/swagger';
import { GroupBaseDTO } from '../base/group.base.dto';

export class GroupResponseDTO extends PickType(GroupBaseDTO, [
  'id',
  'name',
  'users',
] as const) {}
