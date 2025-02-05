import { PickType } from '@nestjs/swagger';
import { GroupBaseDTO } from '../base/group.base.dto';

export class GroupRequestDTO extends PickType(GroupBaseDTO, [
  'name',
] as const) {}
