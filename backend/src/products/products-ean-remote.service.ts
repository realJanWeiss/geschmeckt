import { JSDOM } from 'jsdom';
import { ProductResponseDTO } from './dtos/response/product.response.dto';
import { IProductService } from './products.service.interface';

export class ProductsEanRemoteService implements IProductService {
  public async getProductByEan(
    ean: string,
  ): Promise<ProductResponseDTO | null> {
    return fetch(`https://www.ean-search.org/?q=${ean}`)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        console.log(response);
        const product = this.parseEanRemoteHtml(response, ean);
        return product ? product : null;
      });
  }

  private parseEanRemoteHtml(
    html: string,
    ean: string,
  ): ProductResponseDTO | undefined {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const productName =
      document.querySelector<HTMLAnchorElement>('a[href^="/ean/"]')?.innerText;

    return productName ? new ProductResponseDTO(ean, productName) : undefined;
  }
}
