import { propertyMapper } from '@core/base';
import { CategoryBO } from './category.bo';

export class EditCategoryResponse {
  @propertyMapper('success', Boolean)
  public success: boolean = false;

  @propertyMapper('data', CategoryBO)
  public data?: CategoryBO;
}
