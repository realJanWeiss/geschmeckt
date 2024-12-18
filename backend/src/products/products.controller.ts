import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductResponseDTO } from './dtos/response/product.response.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get a product by EAN code.' })
  @ApiOkResponse({
    description: 'Returns the found products',
    type: [ProductResponseDTO],
  })
  @Get(':ean')
  public async getProduct(
    @Param('ean') ean: string,
  ): Promise<ProductResponseDTO> {
    const product = await this.productsService.getProductByEan(ean);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
