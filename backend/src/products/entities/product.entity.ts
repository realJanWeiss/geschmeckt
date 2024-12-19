import { RatingEntity } from '@/ratings/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  constructor() {}

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ean: string;

  @Column()
  name: string;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  mapToResponseDTO() {
    return {
      ean: this.ean,
      name: this.name,
    };
  }
}
