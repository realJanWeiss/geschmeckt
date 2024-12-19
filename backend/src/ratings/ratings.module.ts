import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingEntity } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '@/authentication/authentication.module';
import { UsersModule } from '@/users/users.module';
import { GroupsModule } from '@/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingEntity]),
    UsersModule,
    AuthenticationModule,
    GroupsModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
