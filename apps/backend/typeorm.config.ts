import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { GroupEntity } from '@/groups/entities/group.entity';
import { ProductEntity } from '@/products/entities/product.entity';
import { RatingEntity } from '@/ratings/entities/rating.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InitDB1736428981323 } from '@/migrations/1736428981323-initDB';
import { SeedProductData11736428981324 } from '@/migrations/1736428981324-seedProductData';

config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.development.env',
});

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, ProductEntity, GroupEntity, RatingEntity],
  migrations: [InitDB1736428981323, SeedProductData11736428981324],
  synchronize: false,
};

export default new DataSource(typeormConfig as DataSourceOptions);
