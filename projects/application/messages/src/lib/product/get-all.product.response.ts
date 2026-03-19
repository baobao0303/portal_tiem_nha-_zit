import { propertyMapper } from '@core/base';
import { ProductBO } from './product.bo';
export class GetAllProductResponse {
  @propertyMapper('items', ProductBO)
  public items: ProductBO[] = [];

  @propertyMapper('activePage', Number)
  activePage: number = 0;

  @propertyMapper('totalPages', Number)
  totalPages: number = 0;

  @propertyMapper('totalItems', Number)
  totalItems: number = 0;

  @propertyMapper('pageSize', Number)
  pageSize: number = 0;
}
