import { ProductEntity } from '@/products/entities/product.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RatingResponseDTO } from '../dtos/response/rating.response.dto';

@Entity('ratings')
export class RatingEntity {
  @PrimaryColumn({ name: 'userId', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'productId', type: 'uuid' })
  productId: string;

  @ManyToOne(() => UserEntity, (user) => user.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column({ type: 'smallint' })
  rating: number;

  mapToResponseDTO(): RatingResponseDTO {
    return {
      rating: this.rating,
      user: this.user?.mapToResponseDTO(),
    };
  }
}
