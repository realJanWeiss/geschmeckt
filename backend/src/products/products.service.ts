import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductResponseDTO } from './dtos/response/product.response.dto';
import { IProductService } from './products.service.interface';
import { ProductRequestDTO } from './dtos/request/product.request.dto';

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public getProductByEan(ean: string): Promise<ProductResponseDTO | null> {
    return this.productRepository.findOneBy({ ean });
  }

  public async insertProduct(
    product: ProductRequestDTO,
  ): Promise<ProductResponseDTO> {
    await this.productRepository.insert(product);
    return product;
  }
}
