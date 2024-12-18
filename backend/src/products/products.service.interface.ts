import { ProductResponseDTO } from './dtos/response/product.response.dto';

export interface IProductService {
  getProductByEan(ean: string): Promise<ProductResponseDTO | null>;
}
