import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/entities/product.entity';
import { UserEntity } from './users/entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { GroupsModule } from './groups/groups.module';
import { GroupEntity } from './groups/entities/group.entity';
import { RatingsModule } from './ratings/ratings.module';
import { RatingEntity } from './ratings/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'geschmeckt',
      entities: [UserEntity, ProductEntity, GroupEntity, RatingEntity],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    UsersModule,
    ProductsModule,
    AuthenticationModule,
    GroupsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
