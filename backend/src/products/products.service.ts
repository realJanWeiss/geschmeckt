import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductResponseDTO } from './dtos/response/product.response.dto';
import { ProductRequestDTO } from './dtos/request/product.request.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async getProductsByEan(ean: string): Promise<ProductResponseDTO[]> {
    const product = await this.productRepository.findBy({ ean });
    return product.map((p) => p.mapToResponseDTO());
  }

  public async insertProduct(
    product: ProductRequestDTO,
  ): Promise<ProductResponseDTO> {
    return (await this.productRepository.save(product)).mapToResponseDTO();
  }
}
