import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupEntity } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './groups.controller';
import { UsersModule } from '@/users/users.module';
import { UserEntity } from '@/users/entities/user.entity';
import { AuthenticationModule } from '@/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
