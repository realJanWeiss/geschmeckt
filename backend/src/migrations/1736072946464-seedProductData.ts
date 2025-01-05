import { ProductEntity } from '@/products/entities/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProductData1736072946464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const product = new ProductEntity();
    product.id = 'f0746b51-fe8c-461f-b3b5-714a7f47b2b1';
    product.name = 'Teekanne Foursenses Beerenauslese';
    product.ean = '9001475012360';

    await queryRunner.manager.getRepository(ProductEntity).insert(product);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const product = await queryRunner.manager
      .getRepository(ProductEntity)
      .findOne({ where: { id: 'f0746b51-fe8c-461f-b3b5-714a7f47b2b1' } });
    if (!product) return;
    await queryRunner.manager.getRepository(ProductEntity).delete(product.id);
  }
}
