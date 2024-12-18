import { PickType } from '@nestjs/swagger';
import { ProductBaseDTO } from '../base/product.base.dto';

export class ProductResponseDTO extends PickType(ProductBaseDTO, [
  'ean',
  'name',
] as const) {
  constructor(ean: string, name: string) {
    super(ean, name);
  }
}
