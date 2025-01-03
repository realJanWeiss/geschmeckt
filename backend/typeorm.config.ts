import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { GroupEntity } from '@/groups/entities/group.entity';
import { ProductEntity } from '@/products/entities/product.entity';
import { RatingEntity } from '@/ratings/entities/rating.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InitDB1735913318164 } from '@/migrations/1735913318164-initDB';
import { SeedProductData1735913977080 } from '@/migrations/1735913977080-seedProductData';

config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.development.env',
});

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, ProductEntity, GroupEntity, RatingEntity],
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: [InitDB1735913318164, SeedProductData1735913977080],
};

export default new DataSource(typeormConfig as DataSourceOptions);
