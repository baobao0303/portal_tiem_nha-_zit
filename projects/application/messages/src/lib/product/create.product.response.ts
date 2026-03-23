import { ProductBO } from './product.bo';

export class CreateProductResponse {
  public product!: ProductBO;
  public message?: string;
}
