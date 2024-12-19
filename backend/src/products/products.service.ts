import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async getProductByEan(ean: string): Promise<ProductResponseDTO> {
    const product = await this.productRepository.findOneBy({ ean });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product.mapToResponseDTO();
  }

  public async insertProduct(
    product: ProductRequestDTO,
  ): Promise<ProductResponseDTO> {
    return (await this.productRepository.save(product)).mapToResponseDTO();
  }
}
