import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  constructor() {}

  @PrimaryColumn()
  ean: string;

  @Column()
  name: string;

  mapToResponseDTO() {
    return {
      ean: this.ean,
      name: this.name,
    };
  }
}
