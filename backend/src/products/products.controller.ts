import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductResponseDTO } from './dtos/response/product.response.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get products by EAN code.' })
  @ApiOkResponse({
    description:
      'Returns the found products. It could be multiple products because ean codes are reused when a product is discontinued.',
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
