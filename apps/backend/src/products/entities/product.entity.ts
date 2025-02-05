import { RatingEntity } from '@/ratings/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductResponseDTO } from '../dtos/response/product.response.dto';

@Entity('products')
export class ProductEntity {
  constructor() {}

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ean: string;

  @Column()
  name: string;

  @OneToMany(() => RatingEntity, (rating) => rating.user, {
    cascade: true,
  })
  ratings: RatingEntity[];

  mapToResponseDTO(): ProductResponseDTO {
    return {
      id: this.id,
      ean: this.ean,
      name: this.name,
    };
  }
}
