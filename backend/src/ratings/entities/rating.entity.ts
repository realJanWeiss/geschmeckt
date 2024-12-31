import { ProductEntity } from '@/products/entities/product.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { RatingResponseDTO } from '../dtos/response/rating.response.dto';

@Entity('ratings')
export class RatingEntity {
  @PrimaryColumn({ name: 'userId', type: 'uuid' })
  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @PrimaryColumn({ name: 'productId', type: 'uuid' })
  @ManyToOne(() => ProductEntity, (product) => product.ratings)
  product: ProductEntity;

  @Column({ type: 'tinyint' })
  rating: number;

  mapToResponseDTO(): RatingResponseDTO {
    return {
      rating: this.rating,
    };
  }
}
