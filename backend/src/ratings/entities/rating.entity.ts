import { ProductEntity } from '@/products/entities/product.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('ratings')
export class RatingEntity {
  @PrimaryColumn({ name: 'userId', type: 'uuid' })
  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @PrimaryColumn({ name: 'productId', type: 'uuid' })
  @ManyToOne(() => ProductEntity, (product) => product.ratings)
  product: ProductEntity;

  @Column()
  rating: number;
}
